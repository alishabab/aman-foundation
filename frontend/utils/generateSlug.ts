import { nanoid } from "nanoid";
export const generateSlug = (str: string) => {
  if (!str.length) {
    throw new Error("String is empty");
  }

  const randomId = nanoid(8);

  if (str.length < 16) {
    return str.trim().toLowerCase().replace(/\s+/g, "-") + "-" + randomId;
  }

  return (
    str.trim().slice(0, 16).toLowerCase().replace(/\s+/g, "-") + "-" + randomId
  );
};
