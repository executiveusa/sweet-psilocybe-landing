// Type definitions for Sweet Psilocybe

export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  confirmed: boolean;
};

export type EmailCaptureResponse = {
  success: boolean;
  message: string;
  data?: Subscriber;
  error?: string;
  isDemoMode?: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
};

export type BrandPillar = {
  icon: string;
  title: string;
  description: string;
  color?: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  storeUrl?: string;
  ogImage?: string;
};
