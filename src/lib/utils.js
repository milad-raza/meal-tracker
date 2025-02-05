export const capitalizeText = (text) => {
    return text
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
