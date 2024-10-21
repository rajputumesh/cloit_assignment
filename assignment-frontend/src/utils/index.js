export const BASE_URL = "http://127.0.0.1:8000/api";

export const deleteArrayRow = (list, key, value) => {
  let data = list;
  if (list) {
    data = list.filter((item) => item[key] !== value);
  }
  return data;
};

export const filterArray = (list, key, value) => {
  let data = list;
  if (list) {
    data = list.filter((item) => item[key] === value);
  }
  return data;
};
