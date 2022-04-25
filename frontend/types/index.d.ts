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
};
