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

export const convertIdToString = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const obj = item.toJSON();

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "number") {
          obj[key] = obj[key].toString();
        }
      });

      return obj;
    });
  }

  const obj = data.toJSON();

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "number") {
      obj[key] = obj[key].toString();
    }
  });

  return obj;
};

export const convertIdToStringHacks = (list) => {
  if (!list) return [];

  if (Array.isArray(list)) {
    return list.map((item) => ({
      ...item.dataValues,
      id: String(item.dataValues.id),
      likes: String(item.dataValues.likes),
      views: String(item.dataValues.views),
    }));
  }

  return {
    ...list.dataValues,
    id: String(list.dataValues.id),
    likes: String(list.dataValues.likes),
    views: String(list.dataValues.views),
  };
};

export const convertIdToStringBusiness = (list) => {
  if (Array.isArray(list)) {
    return list.map((item) => ({
      ...item.dataValues,
      id: String(item.dataValues.id),
    }));
  }

  return {
    ...list.dataValues,
    id: String(list.dataValues.id),
  };
};


export const normalizeGender = (gender) => {
  const allowed = ["Male", "Female", "Other", "All"];

  // If already array
  if (Array.isArray(gender)) {
    return gender.filter((g) => allowed.includes(g));
  }

  // If object (checkbox case)
  if (typeof gender === "object" && gender !== null) {
    return Object.keys(gender).filter(
      (key) => gender[key] === true && allowed.includes(key)
    );
  }

  return [];
};