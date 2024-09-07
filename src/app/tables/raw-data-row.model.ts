import { Order } from "../order.model";
import { DatePipe } from "@angular/common";

export class RawDataRow {
    orderDate: string = '';
    modifiedOn: string = '';
    orderNumber: string = '';
    studentName: string = '';
    grade: string = '';
    programName: string = '';
    pricePaidTotal: string = '';
    pricePaidItem: string = '';
    parentName: string = '';
    phone: string = '';
    email: string = '';
    dropoff: string = '';
    allergies: string = '';
    teacher: string = '';
    discount: string = '';
    discountDescription: string = '';
    refunded: string = '';
    uscfId: string = '';
    school: string = '';
    address: string = '';
    dob: string = '';
    hasBye: string = '';
    uscfExpiry: string = '';
    hasDiscount: boolean = false;
    isMultipleItems: boolean = false;

    static parseOrder(order: Order, selectedItem: number, datePipe: DatePipe): RawDataRow {
        const result = new RawDataRow();
        const date = datePipe.transform(order.orderDate, 'MM/dd/yyyy');
        const date2 = datePipe.transform(order.modifiedOn, 'MM/dd/yyyy');
        result.orderDate = date ? date : '';
        result.modifiedOn = date2 ? date2 : '';
        result.orderNumber = order.orderNumber;
        result.studentName = order.items[selectedItem].studentName;
        result.grade = order.items[selectedItem].grade;
        result.programName = order.items[selectedItem].programName;
        result.pricePaidTotal = order.totalPaid.value;
        result.pricePaidItem = order.items[selectedItem].pricePaid;
        result.parentName = order.items[selectedItem].parentName;
        result.phone = order.items[selectedItem].phone;
        result.email = order.items[selectedItem].email;
        result.dropoff = order.items[selectedItem].dropoff;
        result.allergies = order.items[selectedItem].allergies;
        result.teacher = order.items[selectedItem].teacher ? order.items[selectedItem].teacher : '';
        result.hasDiscount = Boolean(order.discount);
        result.discount = order.discount ? order.discount.value : '';
        result.discountDescription = order.discount ? order.discount.type : '';
        result.refunded = order.refunded ? order.refunded.value : '';
        result.isMultipleItems = order.items.length > 1;
        result.uscfId = order.items[selectedItem].uscfId ? order.items[selectedItem].uscfId : '';
        result.school = order.items[selectedItem].school ? order.items[selectedItem].school : '';
        result.address = order.items[selectedItem].address ? order.items[selectedItem].address : '';
        result.dob = order.items[selectedItem].dob ? order.items[selectedItem].dob : '';
        result.hasBye = order.items[selectedItem].hasBye ? order.items[selectedItem].hasBye : '';
        result.uscfExpiry = order.items[selectedItem].uscfExpiry ? order.items[selectedItem].uscfExpiry : '';
        return result;
    }

    getAsArray(): string[] {
        const result = [
            this.orderDate,
            this.modifiedOn ? this.modifiedOn : '',
            this.orderNumber,
            this.studentName,
            this.grade,
            this.programName,
            this.pricePaidItem,
            this.pricePaidTotal,
            this.hasDiscount ? this.discount : '',
            this.hasDiscount ? this.discountDescription : '',
            this.refunded,
            this.parentName,
            this.phone,
            this.email,
            this.dropoff,
            this.allergies,
            this.teacher,
            this.uscfId,
            this.school,
            this.address,
            this.dob,
            this.hasBye,
            this.uscfExpiry
        ];
        return result;
    }
}