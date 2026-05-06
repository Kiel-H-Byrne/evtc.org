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

export type Course = {
  id: string;
  name: string;
  description: string;
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

export type Student = {
  name: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  courseId: string;
  sessionDates?: string;
  requiresTransportation: boolean;
  travelingFrom: string;
  physicalLimitations: boolean;
  foodAllergies: boolean;
  specificRequirements: string;
  workedInHomeImprovement: boolean;
  howHeard: string;
};
