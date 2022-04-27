export type Campaign = {
  slug: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
  };
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
