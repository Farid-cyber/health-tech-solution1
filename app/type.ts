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
  password: string;
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

export type User = {
  email: string;
  password: string;
  fullname?: string;
  userType?: string;
  id?: string;
};

import "telegraf";

declare module "telegraf" {
  interface SessionData {
    job?: string; // selected doctor job
    doctor_email?: string; // selected doctor email
    doctor_name?: string; // selected doctor name
    step?: string; // current step of user input
    user_name?: string; // patient name
    phone?: string; // patient phone
    issue_type?: string; // optional if you still use it
  }

  interface Context {
    session: SessionData;
  }
}

export type Order = {
  doctorEmail: string;
  fullname: string;
  phoneNumber: string;
  problemType: string;
  problemDescription: string;
  email: string;
  contactType: string;
  telegramUsername: string;
  type: boolean;
};
