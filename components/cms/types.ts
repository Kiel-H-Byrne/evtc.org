// cms/types.ts

export type ResourceType = "pdf" | "slides" | "video" | "link";

export type Resource = {
  id: string;
  type: ResourceType;
  name: string;
  url: string;
  locked: boolean;
};

export type Lesson = {
  id: string;
  name: string;
  resources: Resource[];
};

export type CourseExtraMaterial = {
  description: string;
  price: number;
  priceNote?: string;
};

export type CourseSession = {
  startDate: string;
  endDate: string;
  label?: string;
};

export type MediaItem = {
  _type: "image" | "video" | "beforeAfter";
  asset?: any; // Sanity image asset for standard image
  url?: string; // Video URL
  beforeImage?: any; // Sanity image asset for Before/After
  afterImage?: any; // Sanity image asset for Before/After
  caption?: string;
};

export type Course = {
  id: string;
  slug: string;
  name: string;
  description: string;
  media?: MediaItem[];
  schedule: string;
  price: number;
  priceNote?: string;
  extraMaterial?: CourseExtraMaterial;
  paymentInstructions?: string;
  available: boolean;
  availableDate?: string;
  lessons: Lesson[];
  sessions?: CourseSession[];
};


export type AboutContent = {
  heading: string;
  body: string;
};

export type ContactContent = {
  email: string;
  phone?: string;
  address?: string;
};
