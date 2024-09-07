import { RawDataRow } from "./raw-data-row.model";

export class ParsedAcademyRow {
    programName: string = '';
    orderDate: string = '';
    orderNumber: string = '';
    studentName: string = '';
    grade: string = '';
    program: string = '';
    pricePaidItem: string = '';
    pricePaidTotal: string = '';
    parentName: string = '';
    phone: string = '';
    email: string = '';
    dropoff: string = '';
    allergies: string = '';
    teacher: string = '';
    discount: string = '';
    discountDescription: string = '';

    static parseRawDataRow(rdr: RawDataRow): ParsedAcademyRow {
        const result = new ParsedAcademyRow();
        result.programName = rdr.programName;
        result.orderDate = rdr.orderDate;
        result.orderNumber = rdr.orderNumber;
        result.studentName = rdr.studentName;
        result.grade = rdr.grade;
        result.program = ParsedAcademyRow.convertProgramName(rdr.programName);
        result.pricePaidItem = rdr.pricePaidItem;
        result.pricePaidTotal = rdr.pricePaidTotal;
        result.parentName = rdr.parentName;
        result.phone = rdr.phone;
        result.email = rdr.email;
        result.dropoff = rdr.dropoff;
        result.allergies = rdr.allergies;
        result.teacher = rdr.teacher;
        result.discount = rdr.discount;
        result.discountDescription = rdr.discountDescription;
        return result;
    }

    private static convertProgramName(name: string): string {
        if (name.includes('Package A'))
            return 'A';
        else if (name.includes('Package B'))
            return 'B';
        else if (name.includes('Trial'))
            return 'Trial';
        else if (name.includes('12 Week') ||
            name.includes('12  Week') ||
            name.includes('Green Charter Greenville Level')
        )
            return '12 Wk';
        else if (name === 'Oak Pointe 6 Week Packages Fall 2024' ||
            name === 'Saint John Neumann 6 Week Packages Fall 2024' ||
            name === 'Forest Lake 6 Week Packages Fall 2024' ||
            name === 'MSOC 6 Week Packages Fall 2024' ||
            name === 'Piney Woods 6 Week Packages'
        )
            return 'B';
        else if (name === 'CFK 6 Week Packages' ||
            name === 'Lake Murray 6 Week Packages Fall 2024' ||
            name === 'Shandon Weekday 6 Week Package Fall 2024' ||
            name === 'CFK-North 6 Week Packages'
        )
            return 'A';
        return '';
    }

    getAsArray(): string[] {
        const result = [
            'FALSE',
            this.programName,
            this.orderDate,
            this.orderNumber,
            this.studentName,
            this.grade,
            this.program,
            this.pricePaidItem,
            this.pricePaidTotal,
            this.parentName,
            this.phone,
            this.email,
            this.dropoff,
            this.allergies,
            this.teacher,
            this.discount,
            this.discountDescription,
        ];
        return result;
    }
}