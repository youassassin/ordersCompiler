import { RawDataRow } from "./raw-data-row.model";

export class ParsedTournamentRow {
    programName: string = '';
    orderDate: string = '';
    orderNumber: string = '';
    studentName: string = '';
    uscfId: string = '';
    uscfExpiry: string = '';
    dob: string = '';
    hasBye: string = '';
    address: string = '';
    phone: string = '';
    email: string = '';
    grade: string = '';
    parentName: string = '';
    school: string = '';
    pricePaidItem: string = '';
    pricePaidTotal: string = '';
    discount: string = '';
    discountDescription: string = '';

    static parseRawDataRow(rdr: RawDataRow): ParsedTournamentRow {
        const result = new ParsedTournamentRow();
        result.programName = rdr.programName;
        result.orderDate = rdr.orderDate;
        result.orderNumber = rdr.orderNumber;
        result.studentName = rdr.studentName;
        result.uscfId = rdr.uscfId;
        result.uscfExpiry = rdr.uscfExpiry;
        result.dob = rdr.dob;
        result.hasBye = rdr.hasBye;
        result.address = rdr.address;
        result.phone = rdr.phone;
        result.email = rdr.email;
        result.grade = rdr.grade;
        result.parentName = rdr.parentName;
        result.school = rdr.school;
        result.pricePaidItem = rdr.pricePaidItem;
        result.pricePaidTotal = rdr.pricePaidTotal;
        result.discount = rdr.discount;
        result.discountDescription = rdr.discountDescription;
        return result;
    }

    getAsArray(): string[] {
        const result = [
            'FALSE',
            this.programName,
            this.orderDate,
            this.orderNumber,
            this.studentName,
            this.uscfId,
            this.uscfExpiry,
            this.hasBye,
            this.pricePaidItem,
            this.pricePaidTotal,
            this.dob,
            this.address,
            this.phone,
            this.email,
            this.grade,
            this.parentName,
            this.school,
            this.discount,
            this.discountDescription,
        ];
        return result;
    }
}