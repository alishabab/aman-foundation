export type Campaign = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
  };
  isHighlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
  addedBy: User;
};

export type User = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
};

export type TAlert = "success" | "info" | "danger";
