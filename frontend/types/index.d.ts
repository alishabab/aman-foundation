export type Image = {
  id: string;
  url: string;
};

export type Campaign = {
  slug: string;
  title: string;
  description: string;
  image: Image;
  noOfBenificiaries?: number;
  isHighlighted: boolean;
  isCompleted: boolean;
  isUpComing?: boolean;
  startedAt: Date | string;
  completedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  addedBy: User;
};

export type User = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
};

export type TAlert = "none" | "success" | "info" | "danger";

export type Achievement = {
  title: string;
  description: string;
};

export type About = {
  title?: string;
  description?: string;
  image: Image;
};

export type SocialLink = {
  name: string;
  url: string;
};

export type Organization = {
  name: string;
  logo: Image;
  cover?: Image;
  acheivements: Achievement[];
  about: About[];
  socialLinks: SocialLink[];
};
