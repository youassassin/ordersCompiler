import { Order } from "./order.model";
import { Paid } from "./paid.model";
export class Customization {
    label: string = '';
    value: string = '';
}
export class Item {
    static readonly KLAUS_TOURNAMENT_ID = '64f08fa9651cc5686aa1d6d1';
    static readonly GREENVILLE_TOURNAMENT_SEPTEMBER_ID = '65b97b1a6e634657f83cb044';
    static readonly COLUMBIA_TOURNAMENT_AUGUST_ID = '665deb2be8dce0379f0f4f16';
    static readonly PRIVATE_LESSON_ID = '64ac2dc71118e470e0fff607';
    static readonly GREENVILLE_ACADEMY_WAITLIST_ID = '66c679102b75a5121507e7c4';
    static readonly SOUTH_CAROLINA_ASSOCIATION_DUES_ID = '64f1dcdbcb22ab397673e988';
    static readonly COLUMBIA_CHESS_CAMP_ID = '640a0c6d73d1773690375e24';
    readonly tournaments = [
        Item.COLUMBIA_TOURNAMENT_AUGUST_ID,
        Item.GREENVILLE_TOURNAMENT_SEPTEMBER_ID,
        Item.KLAUS_TOURNAMENT_ID
    ];
    readonly studentTournaments = [
        Item.COLUMBIA_TOURNAMENT_AUGUST_ID,
        Item.GREENVILLE_TOURNAMENT_SEPTEMBER_ID
    ];

    studentName: string = '';
    grade: string = '';
    teacher: string = '';
    programName: string = '';
    programId?: string;
    pricePaid: string = '';
    dropoff: string = '';
    allergies: string = '';
    city?: string;
    coach?: string;
    uscfId?: string;
    school?: string;
    address?: string;
    dob?: string;
    hasBye?: string;
    uscfExpiry?: string;
    phone: string = '';
    email: string = '';
    parentName: string = '';

    setCustomizations(customizations: Customization[], orderDate: Date, orderNumber?: string) {
        if (customizations) {
            const id = this.programId ? this.programId : '';
            this.studentName = this.getField(id, customizations, 'studentName');
            this.grade = this.getField(id, customizations, 'grade');
            this.teacher = this.getField(id, customizations, 'teacher');
            this.dropoff = this.getField(id, customizations, 'dropoff');
            this.allergies = this.getField(id, customizations, 'allergies');
            this.city = this.getField(id, customizations, 'city');
            this.coach = this.getField(id, customizations, 'coach');
            this.uscfId = this.getField(id, customizations, 'uscfId');
            this.school = this.getField(id, customizations, 'school');
            this.address = this.getField(id, customizations, 'address');
            this.dob = this.getField(id, customizations, 'dob');
            this.hasBye = this.getField(id, customizations, 'hasBye');
            this.uscfExpiry = this.getField(id, customizations, 'uscfExpiry');
            this.phone = this.getField(id, customizations, 'phone');
            this.email = this.getField(id, customizations, 'email');
            this.parentName = this.getField(id, customizations, 'parentName');
            const isPassedSwap = (orderDate.getTime() - new Date('08/25/2024').getTime()) > 0;
            if (!isPassedSwap) {
                const temp = this.allergies;
                this.allergies = this.dropoff;
                this.dropoff = temp;
            }
            // if (customizations.length === 8)
            //     console.log(orderNumber + ' ' + this.programName);
        } //else { console.log(orderNumber + ' ' + this.programName); }

    }

    getField(id: string, customizations: Customization[], field: string): string {
        const isFound = customizations[this.lookupIndex(id, field)];
        return isFound ? isFound.value : '';
    }

    lookupIndex(key: string, field: string): number {
        if (key === Item.KLAUS_TOURNAMENT_ID) {
            switch (field) {
                case 'studentName': return 0;
                case 'address': return 1;
                case 'phone': return 2;
                case 'email': return 3;
                case 'uscfId': return 4;
                case 'uscfExpiry': return 5;
                case 'dob': return 6;
                case 'hasBye': return 8;
            }
        } else if (this.studentTournaments.includes(key)) {
            switch (field) {
                case 'studentName': return 0;
                case 'uscfId': return 1;
                case 'dob': return 2;
                case 'hasBye': return 3;
                case 'grade': return 4;
                case 'school': return 5;
                case 'parentName': return 6;
                case 'address': return 7;
                case 'phone': return 8;
                case 'email': return 9;
            }
        } else if (key === Item.PRIVATE_LESSON_ID) {
            switch (field) {
                case 'studentName': return 0;
                case 'grade': return 1;
                case 'parentName': return 2;
                case 'phone': return 3;
                case 'email': return 4;
                case 'city': return 5;
                case 'coach': return 6;
            }
        } else if (key === Item.GREENVILLE_ACADEMY_WAITLIST_ID || key === Item.COLUMBIA_CHESS_CAMP_ID) {
            switch (field) {
                case 'studentName': return 0;
                case 'grade': return 1;
                case 'parentName': return 2;
                case 'phone': return key === Item.COLUMBIA_CHESS_CAMP_ID ? 4 : 3;
                case 'email': return key === Item.COLUMBIA_CHESS_CAMP_ID ? 3 : 4;
                case 'allergies': return 5;
            }
        } else {
            switch (field) {
                case 'studentName': return 0;
                case 'grade': return 1;
                case 'teacher': return 2;
                case 'parentName': return 3;
                case 'email': return 4;
                case 'phone': return 5;
                case 'dropoff': return 6;
                case 'allergies': return 7;
            }
        }
        return 99;
    }
}