import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
export class ICOURSE {
  id?: string;
  description: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon?: string;
  categories: string[];
  lessonsCount?: number;
  promo?: boolean;
  seqNo: number;
  url: string;
  price?: number;
  promoStartAt?: Timestamp;
}
