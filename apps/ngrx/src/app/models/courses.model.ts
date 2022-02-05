

export interface COURSE {
  id: number;
  description: string;
  longDescription: string;
  iconUrl: string;
  category: string;
  seqNo: string;
  url: string;
}

export interface TOKEN {
  token: string;
}

export interface LESSON {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}
