import { BASE_URL } from "../utils";

const menuService = {};

//for fatch Menu list
menuService.manuList = function () {
  return fetch(`${BASE_URL}/menu/list`);
};

//for fatch Menu details
menuService.manuShow = function (reqeustParam) {
  return fetch(`${BASE_URL}/menu/show`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqeustParam),
  });
};

//for create new menu
menuService.manuStore = function (reqeustParam) {
  return fetch(`${BASE_URL}/menu/create`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqeustParam),
  });
};

//for update a menu
menuService.manuUpdate = function (reqeustParam) {
  return fetch(`${BASE_URL}/menu/update`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqeustParam),
  });
};

//for delete a menu
menuService.manuDelete = function (id) {
  return fetch(`${BASE_URL}/menu/delete/${id}`, {
    method: "put",
  });
};

export default menuService;
