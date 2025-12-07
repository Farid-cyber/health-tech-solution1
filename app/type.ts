export type Doctor = {
  id?: string;
  fullname: string;
  phonenumber: string;
  telegramUserName: string;
  email: string;
  degree: string;
  job: string;
  jobdescription: string;
  workinghours: string;
  imageUrl: string;
};

export type Hospital = {
  id?: string;
  name: string;
  shahar: string;
  manzil: string;
  telefon: string;
  turi: string;
  rasm: string;
  joylashuv: string;
  ish_vaqti: string;
};

export type Xabar = {
  id?: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  author: string;
  description: string;
};

export type OxirgiXabar = {
  id?: string;
  title: string;
  // imageUrl: string;
  createdAt: string;
  author: string;
  description: string;
};
