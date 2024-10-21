import React, { useEffect, useState } from "react";
import menuService from "../services/menuService";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { menuState } from "../recoil-states";

const AddMenu = ({ record }) => {
  const setMenuState = useSetRecoilState(menuState);
  const [formData, setFormData] = useState({
    name: "",
    parent_id: null,
    mode: "Add",
  });
  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    record && record.mode == "Edit"
      ? setFormData({
          name: record?.name,
          parent_name: record?.parent?.name,
          menu_id: record?.id,
          depth: record?.depth,
          mode: "Edit",
        })
      : setFormData({
          name: null,
          parent_name: record?.name,
          parent_id: record?.id,
          depth: null,
          mode: "Add",
        });
  }, [record]);

  const handleSaveMenu = (e) => {
    e.preventDefault();
    var resp;
    record && record.mode == "Edit"
      ? (resp = menuService.manuUpdate(formData))
      : (resp = menuService.manuStore(formData));
    resp
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (record && record.mode == "Edit") {
          setMenuState((oldState) =>
            oldState.filter((item) => item.id !== formData.menu_id)
          );
        }
        setMenuState((oldState) => [...oldState, res]);
        setFormData({
          name: "",
          parent_id: null,
          mode: "Add",
        });
        Swal.fire({
          icon: "success",
          title: "success",
          text: `Menu has been added successfully`,
        });
      })
      .catch((err) => {});
  };

  const deleteMenu = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        const resp = menuService.manuDelete(formData.menu_id);
        resp
          .then((res) => {
            setMenuState((oldState) =>
              oldState.filter((item) => item.id !== formData.menu_id)
            );
            setFormData({
              name: "",
              parent_id: null,
              mode: "Add",
            });
            Swal.fire({
              icon: "success",
              title: "success",
              text: `Menu has been deleted successfully`,
            });
          })
          .catch((err) => {});
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSaveMenu}>
      <h4 className="font-bold">{formData.mode} Menu</h4>
      {formData.mode == "Edit" && (
        <>
          <div>
            <label className="block pb-1 text-gray-600">Menu ID</label>
            <input
              type="text"
              className="w-full bg-slate-50 p-4 border rounded-2xl"
              readOnly
              value={formData.menu_id}
            />
          </div>
          <div>
            <label className="block pb-1 text-gray-600">Depth</label>
            <input
              type="text"
              className="w-full bg-slate-200 md:w-full lg:w-1/2 p-4 border rounded-2xl"
              readOnly
              value={formData.depth}
            />
          </div>
        </>
      )}

      {formData.mode == "Edit" && (
        <div>
          <label className="block pb-1 text-gray-600">Parent Data</label>
          <input
            type="text"
            className="w-full bg-slate-50 md:w-full lg:w-1/2 p-4 border rounded-2xl"
            name="parent_id"
            value={formData?.parent_name}
            onChange={(e) => inputChange(e)}
            readOnly
          />
        </div>
      )}

      <div>
        <label className="block pb-1 text-gray-600">Name</label>
        <input
          type="text"
          className="w-full bg-slate-50 md:w-full lg:w-1/2 p-4 border rounded-2xl"
          name="name"
          value={formData.name}
          onChange={(e) => inputChange(e)}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="w-full md:w-full lg:w-1/2 bg-blue-500 text-white py-4 mt-4 rounded-2xl"
        >
          Save
        </button>
        {formData && formData.mode === "Edit" && (
          <button
            type="button"
            className="w-full md:w-full lg:w-1/2 bg-red-500 text-white py-4 mt-4 rounded-2xl"
            onClick={deleteMenu}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default AddMenu;
