import { RawDataRow } from "./raw-data-row.model";

export class ParsedRefundedRow {
    programName: string = '';
    orderDate: string = '';
    orderNumber: string = '';
    studentName: string = '';
    pricePaidItem: string = '';
    pricePaidTotal: string = '';
    discount: string = '';
    refunded: string = '';
    isPartiallyRefunded: boolean = false;

    static parseRawDataRow(rdr: RawDataRow): ParsedRefundedRow {
        const result = new ParsedRefundedRow();
        result.programName = rdr.programName;
        result.orderDate = rdr.orderDate;
        result.orderNumber = rdr.orderNumber;
        result.studentName = rdr.studentName;
        result.pricePaidItem = rdr.pricePaidItem;
        result.pricePaidTotal = rdr.pricePaidTotal;
        result.discount = rdr.discount;
        result.refunded = rdr.refunded;
        result.isPartiallyRefunded = +rdr.refunded - +rdr.pricePaidTotal !== 0;
        return result;
    }

    getAsArray(): string[] {
        const result = [
            'FALSE',
            this.orderDate,
            this.orderNumber,
            this.studentName,
            this.programName,
            this.pricePaidItem,
            this.pricePaidTotal,
            this.discount,
            this.refunded,
            this.isPartiallyRefunded + '',
        ];
        return result;
    }
}