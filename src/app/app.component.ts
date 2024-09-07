import { Component, inject, OnInit } from '@angular/core';
import { ThinkMoveService } from './think-move.service';
import { Order } from './order.model';
import { Item } from './item.model';
import { AuthGoogleService } from './services/auth-google.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { RawDataRow } from './tables/raw-data-row.model';
import { GlobalsService } from './services/globals.service';
import { Paid } from './paid.model';

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
  private globals = inject(GlobalsService);

  content = '';
  title = 'ordersCompiler';
  tillDate = new Date('07/30/2024');
  orders: Order[] = [];
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
    grade = grade.replace('third', '3');
    grade = grade.replace('second', '2');
    grade = grade.replace('first', '1');
    grade = grade.replace('kindergarten', 'K');
    grade = grade.trim();
    grade = grade.substring(0, 1);
    grade = grade.toUpperCase();
    return grade;
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
    console.log(latest.getTime() - this.tillDate.getTime())
    if (latest.getTime() - this.tillDate.getTime() > 0) {
      this.service.getNextOrders(cursor).subscribe(async data => {
        console.log(data)
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
    this.orders.forEach(order => {
      order.items.forEach((item, index) => {
        const rdw = RawDataRow.parseOrder(order, index, this.datePipe);
        rows.push(rdw.getAsArray());
      });
    });
    rawdata.values = rows;
    this.service.setData(rawdata).subscribe(data => {
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
