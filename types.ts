
export enum PropertyType {
  APARTMENT = 'آپارتمان',
  VILLA = 'ویلا',
  LAND = 'زمین',
  COMMERCIAL = 'تجاری',
}

export enum PropertyStatus {
  AVAILABLE = 'موجود',
  PENDING_DEAL = 'در حال معامله',
  EXCHANGED = 'تهاتر شده',
}

export enum ProposalStatus {
  PENDING = 'در انتظار پاسخ',
  ACCEPTED = 'پذیرفته شده',
  REJECTED = 'رد شده',
  IN_REVIEW = 'در حال بررسی کارشناسی',
}

export enum VerificationStatus {
  UNVERIFIED = 'تأیید نشده',
  PENDING = 'در حال بررسی',
  VERIFIED = 'تأیید شده',
}

export interface User {
  id: string;
  name: string;
  profilePicture?: string;
  city?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  owner: User;
  propertyType: PropertyType;
  address: string;
  city: string;
  area: number; // in square meters
  rooms: number;
  yearBuilt: number;
  images: string[];
  estimatedValue: number;
  status: PropertyStatus;
  barterPreferences: string[];
  verificationStatus?: VerificationStatus;
}

export interface BarterProposal {
  id: string;
  proposer: User;
  proposerProperty: Property;
  receiver: User;
  receiverProperty: Property;
  status: ProposalStatus;
  message: string;
  cashDifference?: number;
}
