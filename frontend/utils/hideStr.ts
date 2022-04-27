export const hideStr = (str: string) => {
  const updatedStr = str.toLocaleLowerCase();
  if (updatedStr.length < 10) {
    return updatedStr;
  }
  return (
    updatedStr.substring(0, 4) +
    ".." +
    updatedStr.substring(updatedStr.length - 3)
  );
};
