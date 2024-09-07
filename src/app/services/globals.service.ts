import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  readonly KLAUS_TOURNAMENT_ID = '64f08fa9651cc5686aa1d6d1';
  readonly GREENVILLE_TOURNAMENT_SEPTEMBER_ID = '65b97b1a6e634657f83cb044';
  readonly COLUMBIA_TOURNAMENT_AUGUST_ID = '665deb2be8dce0379f0f4f16';
  readonly tournaments = [
    this.COLUMBIA_TOURNAMENT_AUGUST_ID, // August Columbia
    this.GREENVILLE_TOURNAMENT_SEPTEMBER_ID, // September Greenville
    this.KLAUS_TOURNAMENT_ID // Klaus
  ];
  readonly productsMap = [
    {
      key: '66bd10c33165ea2e17017447',
      value: 'Saint John Neumann 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '66ba51060469903865dced92',
      value: 'Saint John Neumann 6 Week Packages Fall 2024'
    },
    {
      key: '66bf839a1a2a4b69f4b5cc85',
      value: 'Forest Lake 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '63a9f7622038f96a2f1289c3',
      value: 'Forest Lake 6 Week Packages Fall 2024'
    },
    {
      key: '66bd0707f640ee43a73a676a',
      value: 'Ballentine 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '62d5862ea04ae44d0b7bac99',
      value: 'Ballentine 6 Week Packages Fall 2024 Package B'
    },
    {
      key: '656f41dcb5a61428a0476522',
      value: 'Bridge Creek 6 Week Package Fall 2024 Package A'
    },
    {
      key: '66bd0b182a12261ca5e05f42',
      value: 'Bridge Creek 6 Week Package Fall 2024 Package B'
    },
    {
      key: '65b97b1a6e634657f83cb044',
      value: 'September Greenville Tournament Entry'
    },
    {
      key: '66d70582acb71d655fcb172f',
      value: 'MRCA 12 Week Package Fall 2024'
    },
    {
      key: '66da0b1fefd21a3694636bbb',
      value: 'McKissick Academy 6 Week Package A'
    },
    {
      key: '66bd0bd95c1305695010a89f',
      value: 'CFK 6 Week Packages Fall 2024 Package B'
    },
    {
      key: '656f456e5fde8725f6daaf84',
      value: 'CFK 6 Week Packages'
    },
    {
      key: '63b721347eb9861888570f37',
      value: 'Green Charter Greenville Level 2 (Intermediate)'
    },
    {
      key: '65e0c72e143e8d20459d36e6',
      value: 'St Anthony of Padua Fall 2024'
    },
    {
      key: '66ab9836081eef53eaf38598',
      value: 'Upstate Montessori Academy 12 Week Package Fall 2024'
    },
    {
      key: '66bd10404bff7315669b83c6',
      value: 'Piney Woods 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '64f08fa9651cc5686aa1d6d1',
      value: 'Klaus Tournament Entry'
    },
    {
      key: '63a9fba002583e3a390bbcd6',
      value: 'Lake Murray 6 Week Packages Fall 2024'
    },
    {
      key: '649dd2451e75855f944b6fd5',
      value: 'CFK-North 6 Week Packages'
    },
    {
      key: '66bd0e39fab1de56efc2e44a',
      value: 'MSOC 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '654ad9a8b58b3f4b68c42b22',
      value: 'MSOC 6 Week Packages Fall 2024'
    },
    {
      key: '63e66f8262241a3143341d73',
      value: 'Our Lady of the Rosary 12 Week Package'
    },
    {
      key: '66bd0f03ba98cb5231f4de19',
      value: 'Oak Pointe 6 Week Packages Fall 2024 Package A'
    },
    {
      key: '66bd0d12a064ed652bd21785',
      value: 'Lake Murray 6 Week Packages Fall 2024 Package B'
    },
    {
      key: '64a865f0dbccbe44198afe84',
      value: 'Shandon Weekday 6 Week Package Fall 2024'
    },
    {
      key: '66880b8d19a0eb44f22f325b',
      value: 'Green Charter Simpsonville 12 Week Package'
    },
    {
      key: '6688028d6375fd6fb6aca45e',
      value: 'McKissick Academy 12 Weeks Package'
    },
    {
      key: '63c19ca1a756c2749e6a3f21',
      value: 'Oak Pointe 6 Week Packages Fall 2024'
    },
    {
      key: '64ac2dc71118e470e0fff607',
      value: 'Private Lesson'
    },
    {
      key: '63c19cbe95d87806beb83732',
      value: 'Oak Pointe 12 Week Package'
    },
    {
      key: '66cca57a936c426e7bcc73fd',
      value: 'Green Charter Advance Placement for Michael Fisher'
    },
    {
      key: '66c679102b75a5121507e7c4',
      value: 'Greenville Academy Classes Waitlist Classes Starting in October 2024'
    },
    {
      key: '66bf84f11a2a4b69f4b62b58',
      value: 'CFK-North 6 Week Fall 2024 Package B'
    },
    {
      key: '63b71fc807845a29919fb34d',
      value: 'Green Charter Greenville Level 1 (Beginner)'
    },
    {
      key: '64f1dcdbcb22ab397673e988',
      value: 'South Carolina Chess Association Dues'
    },
    {
      key: '665deb2be8dce0379f0f4f16',
      value: 'August Columbia Tournament Entry Only'
    },
    {
      key: '640a0c6d73d1773690375e24',
      value: 'Columbia, SC Chess Summer Camp'
    },
    {
      key: '64da7549afea4d30aef19e78',
      value: 'Piney Woods 1 Class Trial'
    },
    {
      key: '63d1845e3e8c465f75e5d9d0',
      value: 'Piney Woods 6 Week Packages'
    },
    {
      key: '63a225054863b715a45d452e',
      value: 'Ballentine 12 Week Package Fall 2024'
    },
    {
      key: '64da724047a0db67dfd2dc13',
      value: 'Shandon Weekday 1 Class Trial'
    },
    {
      key: '65f0a8009460881c9f19193a',
      value: 'Intermediate Chess Classes Boardwalk Sundays'
    }
  ];
}
