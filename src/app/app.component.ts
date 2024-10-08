import { Component, inject, OnInit } from '@angular/core';
import { ThinkMoveService } from './services/think-move.service';
import { Order } from './order.model';
import { Item } from './item.model';
import { AuthGoogleService } from './services/auth-google.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { RawDataRow } from './tables/raw-data-row.model';
import { Paid } from './paid.model';
import { ParsedAcademyRow } from './tables/parsed-academy-row';
import { ParsedTournamentRow } from './tables/parsed-tournament-row';
import { ParsedRefundedRow } from './tables/parsed-refunded-row';
import { StripeService } from './services/stripe.service';

export class StripeData {
  txnId: string = '';
  fee: number | undefined = 0;
  orderId: string = '';
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private service = inject(ThinkMoveService);
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private stripeService = inject(StripeService);

  content = '';
  title = 'ordersCompiler';
  tillDate = new Date('07/30/2024');
  orders: Order[] = [];
  stripeData: StripeData[] = [];
  transactionMap: Map<string, number> = new Map();
  metaData: string[][] = [];
  programs = new Map<string, string>();

  ngOnInit(): void {
    this.getOrders();
  }

  parseOrder(element: any): Order {
    const order = new Order;
    order.orderDate = new Date(element.createdOn);
    order.modifiedOn = new Date(element.modifiedOn);
    order.orderNumber = element.orderNumber;
    order.orderId = element.id;
    order.totalPaid = element.grandTotal
    if (element.discountTotal.value !== '0.00') {
      order.discount = new Paid();
      order.discount.value = element.discountTotal.value;
      order.discount.type = element.discountLines[0].name;
    }
    if (element.refundedTotal.value !== '0.00') {
      order.refunded = new Paid();
      order.refunded.value = element.refundedTotal.value;
    }
    order.items = [];
    element.lineItems.forEach((element: any) => {
      order.items.push(this.parseItem(element, order));
    });
    return order;
  }

  parseItem(element: any, order: Order): Item {
    const item = new Item;
    this.programs.set(element.productId, element.productName)
    item.programId = element.productId;
    item.programName = element.productName;
    item.pricePaid = element.unitPricePaid.value;
    item.setCustomizations(element.customizations, order.orderDate);

    item.grade = this.formatGrade(item.grade);
    return item;
  }

  formatGrade(grade: string): string {
    grade = grade.toLowerCase();
    grade = grade.replace('rising', '');
    grade = grade.replace('grade', '');
    grade = grade.replace('Going into 6th', '6');
    grade = grade.replace('third', '3');
    grade = grade.replace('second', '2');
    grade = grade.replace('first', '1');
    grade = grade.replace('kindergarten', 'K');
    grade = grade.replace('Belle 2nd - Lawson Kindergarten', '2&K');
    grade = grade.trim();
    grade = grade.substring(0, 1);
    grade = grade.toUpperCase();
    return grade;
  }

  getStripe() {
    this.stripeService.getCharges().subscribe(data => {
      let lastObj: any;
      data.data.forEach((element: any) => {
        lastObj = element;
        const sd = new StripeData;
        sd.txnId = element.balance_transaction;
        sd.orderId = element.metadata.orderId;
        if (sd.orderId)
          this.stripeData.push(sd);
      });
      console.log(data);
      console.log(this.stripeData);
      this.getMoreCharges(lastObj.id, new Date(lastObj.created * 1000));
    });
    this.stripeService.getBalanceTransactions().subscribe(data => {
      let lastObj: any;
      data.data.forEach((element: any) => {
        this.transactionMap.set(element.id, element.fee);
        lastObj = element;
      });
      this.getMoreTransactions(lastObj.id, new Date(lastObj.created * 1000));
      console.log(data);
    });
  }

  getMoreCharges(cursor: string, latest: Date) {
    if (latest.getTime() - this.tillDate.getTime() > 0) {
      this.stripeService.getNextCharges(cursor).subscribe(async data => {
        data.data.forEach((element: any) => {
          const sd = new StripeData;
          sd.txnId = element.balance_transaction;
          sd.orderId = element.metadata.orderId;
          if (sd.orderId)
            this.stripeData.push(sd);
        });

        console.log(data)
        const lastObj = data.data[99];
        await this.getMoreCharges(lastObj.id, new Date(lastObj.created * 1000));
      });
    }
  }

  getMoreTransactions(cursor: string, latest: Date) {
    if (latest.getTime() - this.tillDate.getTime() > 0) {
      this.stripeService.getNextBalanceTransactions(cursor).subscribe(async data => {
        let lastObj: any;
        data.data.forEach((element: any) => {
          this.transactionMap.set(element.id, element.fee);
          lastObj = element;
        });
        await this.getMoreTransactions(lastObj.id, new Date(lastObj.created * 1000));
        console.log(data);
      });
    }
  }

  getMoreStripe() {
    this.stripeData.forEach(data => {
      data.fee = this.transactionMap.get(data.txnId);
    });
    console.log(this.stripeData);
    this.orders.forEach(data => {
      this.stripeData.forEach(value => {
        if (data.orderNumber === value.orderId) {
          data.stripeFee = (value.fee ? value.fee / 100 : 0.00) + '';
          return;
        }
      })
    });
    console.log(this.orders);
  }

  getOrders() {
    this.service.getOrders().subscribe(data => {
      data.result.forEach((element: any) => {
        this.orders.push(this.parseOrder(element));
      });
      // date, link, #, cursor, last order
      let latest = this.orders[this.orders.length - 1].orderDate;
      let cursor = data.pagination.nextPageCursor;
      let count = 1;

      this.pushMetaData(count, latest, cursor)

      this.getMoreOrders(cursor, latest, count);

      console.log(this.orders)
      console.log(data);
      console.log(this.programs)
    });
    console.log(this.tillDate)
    this.title = 'switch';
  }

  getMoreOrders(cursor: string, latest: Date, count: number) {
    if (latest.getTime() - this.tillDate.getTime() > 0) {
      this.service.getNextOrders(cursor).subscribe(async data => {
        data.result.forEach((element: any) => {
          this.orders.push(this.parseOrder(element));
        });
        latest = this.orders[this.orders.length - 1].orderDate;
        cursor = data.pagination.nextPageCursor;

        this.pushMetaData(++count, latest, cursor)

        console.log(data)
        await this.getMoreOrders(cursor, latest, count);
      });
    }
  }

  showPrograms() {
    console.log(this.programs)
    let iter = this.programs.keys();
    let value = iter.next();
    while (!value.done) {
      console.log(value.value);
      value = iter.next();
    }
  }

  pushMetaData(currentPage: number, lastOrderDate: Date, cursor: string) {
    let now = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    let last = this.datePipe.transform(lastOrderDate, 'MM/dd/yyyy');

    this.metaData.push([
      now ? now : '',
      currentPage + '',
      last ? last : '',
      cursor
    ]);
  }

  postRawdata() {
    const input = {
      range: 'raw metadata!A2',
      majorDimension: 'ROWS',
      values: this.metaData
    };
    this.service.setData(input).subscribe(data => {
      console.log(data);
    });
    const rawdata = {
      range: 'raw data!A2',
      majorDimension: 'ROWS',
      values: [['']]
    };
    const rows: string[][] = [];
    const rdrData: RawDataRow[] = [];
    this.orders.forEach(order => {
      order.items.forEach((item, index) => {
        const rdr = RawDataRow.parseOrder(order, index, this.datePipe);
        rdrData.push(rdr);
        rows.push(rdr.getAsArray());
      });
    });
    rawdata.values = rows;
    this.service.setData(rawdata).subscribe(data => {
      console.log(data);
    });
    this.postParsedAcademy(rdrData);
    this.postParsedTournament(rdrData);
    this.postParsedRefund(rdrData);
    this.postParsedOther(rdrData);
  }
  postParsedAcademy(rdr: RawDataRow[]) {
    const parseddata = {
      range: 'parsed academy!A2',
      majorDimension: 'ROWS',
      values: [['']]
    };
    const rows: string[][] = [];
    rdr.forEach(rd => {
      const par = ParsedAcademyRow.parseRawDataRow(rd);
      if (rd.refunded === '' && !Item.nonAcadmey.includes(rd.programId))
        rows.push(par.getAsArray());
    });
    parseddata.values = rows;
    this.service.setDataNotRaw(parseddata).subscribe(data => {
      console.log(data);
    });
  }
  postParsedTournament(rdr: RawDataRow[]) {
    const parsedTournyData = {
      range: 'parsed tournament!A2',
      majorDimension: 'ROWS',
      values: [['']]
    };
    const rows: string[][] = [];
    rdr.forEach(rd => {
      const ptr = ParsedTournamentRow.parseRawDataRow(rd);
      if (rd.refunded === '' && Item.tournaments.includes(rd.programId))
        rows.push(ptr.getAsArray());
    });
    parsedTournyData.values = rows;
    this.service.setDataNotRaw(parsedTournyData).subscribe(data => {
      console.log(data);
    });
  }
  postParsedRefund(rdr: RawDataRow[]) {
    const parsedTournyData = {
      range: 'parsed refund!A2',
      majorDimension: 'ROWS',
      values: [['']]
    };
    const rows: string[][] = [];
    rdr.forEach(rd => {
      const prr = ParsedRefundedRow.parseRawDataRow(rd);
      if (rd.refunded !== '')
        rows.push(prr.getAsArray());
    });
    parsedTournyData.values = rows;
    this.service.setDataNotRaw(parsedTournyData).subscribe(data => {
      console.log(data);
    });
  }
  postParsedOther(rdr: RawDataRow[]) {
    const parsedOtherData = {
      range: 'parsed other!A2',
      majorDimension: 'ROWS',
      values: [['']]
    };
    const rows: string[][] = [];
    rdr.forEach(rd => {
      if (rd.refunded === '' && !Item.tournaments.includes(rd.programId) && Item.nonAcadmey.includes(rd.programId))
        rows.push(rd.getAsArray());
    });
    parsedOtherData.values = rows;
    this.service.setDataNotRaw(parsedOtherData).subscribe(data => {
      console.log(data);
    });
  }

  handleSigninClick() {
    new LoginComponent().signInWithGoogle();
  }

  handleSignoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
