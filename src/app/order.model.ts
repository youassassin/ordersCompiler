import { Item } from "./item.model";
import { Paid } from "./paid.model";

export class Order {
    orderDate: Date = new Date;
    modifiedOn: Date = new Date;
    orderNumber: string = '';
    orderId: string = '';
    items: Item[] = [];
    isBothPackages: boolean = false;
    totalPaid: Paid = new Paid;
    discount?: Paid;
    refunded?: Paid;
    customerEmail: string = '';
}