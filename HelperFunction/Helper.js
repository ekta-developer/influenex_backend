export const convertToString = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertToString);
  }

  if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (let key in obj) {
      newObj[key] = convertToString(obj[key]);
    }
    return newObj;
  }

  return obj !== null && obj !== undefined ? String(obj) : "";
};