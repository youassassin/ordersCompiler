import { Item } from "./item.model";

export class Order {
    orderDate: Date = new Date;
    orderNumber: string = '';
    orderId: string = '';
    items: Item[] = [];
    totalPaid: string = '';
    discount: string = '';
    parentName: string = '';
    phone: string = '';
    email: string = '';
}