import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Course {
  id: string;
  description: string;
  url: string;
  longDescription: string;
  iconUrl: string;
  seqNo: number;
  categories: string[];
  lessonsCount: number;
  promo: boolean;
  promoStartAt: Timestamp;
}

export interface PAGE {
  first: number;
  page: number;
  pageCount: number;
  rows: number;
}
