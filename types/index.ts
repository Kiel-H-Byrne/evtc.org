export type FloatingImage = {
  url: string;
  title: string;
};

export type Leader = {
  name: string;
  role: string;
  img: string;
  phone: string;
  email: string;
};

export type Professional = {
  name: string;
  email: string;
  img: string;
  title: string;
};

export type Resource = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

export type PaymentOption = {
  service: string;
  username: string;
  url?: string;
  icon: React.ReactNode;
};

export type Payment = {
  amount: { amount: string; per: string };
  options: PaymentOption[];
  note: string;
  closingWords?: string;
};

export type DescList = {
  title: string;
  items: string[];
};

export type Event = {
  title: string;
  date: string;
  location: string;
  time: string;
  desc: string;
  img: string;
  thumbnailUrl: string;
  descLists?: DescList[];
  payment?: Payment;
  closingWords?: string;
};

export type PastEvent = {
  title: string;
  img: string;
};

export type Section = {
  key: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
};

export type HeroCarouselItem = {
  title: string;
  textContent: {
    greeting?: string;
    message: string;
    closing?: string;
    signature?: { text?: string; name: string };
  };
  type: "video" | "image";
  aspect: string;
  url: string;
};

export type BillForm = {
  name: string;
  email: string;
  need: string;
};

export type ScholarshipForm = {
  name: string;
  email: string;
  essay: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

