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
  location: string;
  phonenumber: string;
  email: string;
  imageUrl: string;
  workinghours: string;
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
