import { Component } from '@angular/core';
import { ThinkMoveService } from './think-move.service';
import { Order } from './order.model';
import { Item } from './item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ordersCompiler';
  tillDate = new Date('07/30/2024');
  programs = new Map<string, string>();
  orders: Order[] = []
  constructor(private service: ThinkMoveService) { }
  doWork() {
    this.service.getOrders().subscribe(data => {
      data.result.forEach((element: any) => {
        const order = new Order;
        order.orderDate = new Date(element.createdOn);
        order.orderNumber = element.orderNumber;
        order.orderId = element.id;
        order.totalPaid = element.grandTotal
        order.discount = JSON.stringify(element.discoutLines);
        if (element.lineItems[0].customizations) {
          order.email = element.lineItems[0].customizations[4].value;
          order.phone = element.lineItems[0].customizations[5].value;
          order.parentName = element.lineItems[0].customizations[3].value;
          order.items = [new Item];
          this.programs.set(element.lineItems[0].productId, element.lineItems[0].productName)
          order.items[0].programName = element.lineItems[0].productName;
          order.items[0].pricePaid = element.lineItems[0].unitPricePaid;
          order.items[0].studentName = element.lineItems[0].customizations[0].value;
          order.items[0].grade = element.lineItems[0].customizations[1].value;
          order.items[0].teacher = element.lineItems[0].customizations[2].value;
          if (element.lineItems[0].customizations[6])
            order.items[0].allergies = element.lineItems[0].customizations[6].value;
          else
            console.log(order.orderNumber)
          if (element.lineItems[0].customizations[7])
            order.items[0].dropoff = element.lineItems[0].customizations[7].value;
          else
            console.log(order.orderNumber)
        }
        else {
          console.log(order.orderNumber)
        }
        this.orders.push(order);
      });
      let cursor = data.pagination.nextPageCursor;
      console.log(this.orders)
      console.log(data);
      console.log(this.programs)
    });
    console.log(this.tillDate)
    this.title = 'switch';
  }
}
