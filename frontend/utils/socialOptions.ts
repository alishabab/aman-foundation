import { SocialMediaType } from "types";
type SocialOption = { label: string; value: SocialMediaType };

export const SocialOptions: SocialOption[] = [
  {
    label: "Facebook",
    value: "facebook",
  },
  {
    label: "Twitter",
    value: "twitter",
  },
  {
    label: "Instagram",
    value: "instagram",
  },
  {
    label: "LinkedIn",
    value: "linkedin",
  },
  {
    label: "YouTube",
    value: "youtube",
  },
  {
    label: "Other",
    value: "other",
  },
];
