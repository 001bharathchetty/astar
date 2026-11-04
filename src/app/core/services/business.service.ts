import { Injectable } from '@angular/core';

export interface BusinessDetails {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
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
    email: 'info@astarelectricals.com',
    gstin: '29ACPFA5825L1ZR',
    address: {
      street: 'Door#2, 2nd Floor, Krishna Reddy Layout',
      landmark: '3rd Block, 80 Feet Main Road',
      area: 'HBR Layout, Kalyan Nagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560043',
      country: 'India',
      full: 'Door#2, 2nd Floor, Krishna Reddy Layout, HBR Layout, 3rd Block, 80 Feet Main Road, Kalyan Nagar, Bengaluru - Karnataka, 560043'
    }
  };
}
