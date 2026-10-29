import { Injectable } from '@angular/core';

export interface BusinessDetails {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  gstin: string;
  address: {
    street: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    full: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  readonly business: BusinessDetails = {
    name: 'AStar Electricals',
    tagline: 'Powering Quality. Built on Trust.',
    description: 'Your trusted partner for electrical supplies, industrial components, wholesale wiring, and residential electrical fittings in Bengaluru.',
    phone: '+91 9880057744',
    phoneRaw: '+919880057744',
    gstin: '29ACPFA5825L1ZR',
    address: {
      street: 'Ground floor, #7, 3rd cross, 3rd main road',
      landmark: 'Near Javeria School',
      area: 'Saraipalya, Thanisandra',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560077',
      country: 'India',
      full: 'Ground floor, #7, 3rd cross, 3rd main road, Near Javeria School, Saraipalya, Thanisandra, Bengaluru - Karnataka, 560077'
    }
  };
}
