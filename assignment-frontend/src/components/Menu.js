import React, { useState, useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import MenuItem from "./MenuItem";
import AddMenu from "./AddMenu";
import { todoListStatsState } from "../recoil-states";
import { useRecoilValue } from "recoil";

const Menu = () => {
  const menuItems = useRecoilValue(todoListStatsState);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [record, setRecord] = useState(null);
  const [menuExpand, setMenuExpand] = useState([]);

  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
    setRecord(null);
  };

  const expandAll = () => {
    const expandedState = generateExpandedState(menuItems, true);
    setExpandedNodes(expandedState);
    setRecord(null);
  };

  const collapseAll = () => {
    const collapsedState = generateExpandedState(menuItems, false);
    setExpandedNodes(collapsedState);
    setRecord(null);
  };

  const generateExpandedState = (nodes, expand) => {
    const expandedState = {};
    const traverse = (nodes) => {
      nodes.forEach((node) => {
        expandedState[node.id] = expand;
        if (node.children) traverse(node.children);
      });
    };
    traverse(nodes);
    return expandedState;
  };

  //for api

  const handleSelect = (node) => {
    const depth = getDepth(menuItems, node.id);
    setRecord({ ...node, ["depth"]: depth, ["mode"]: "Edit" });
  };

  const addNodes = (node) => {
    setRecord({ ...node, ["mode"]: "Add" });
  };

  const toggleMenuChange = (e) => {
    const data = menuItems.filter((item) => item["id"] === e.target.value);
    setMenuExpand(data[0]);
    setRecord(null);
  };

  const getDepth = (nodes, id, depth = 0) => {
    for (const node of nodes) {
      if (node.id === id) return depth + 1;
      if (node.children) {
        const childDepth = getDepth(node.children, id, depth + 1);
        if (childDepth) return childDepth;
      }
    }
    return 0;
  };

  useEffect(() => {
    setMenuExpand(menuItems[0] || []);
  }, [menuItems])

  return (
    <div className="mt-4 lg:mt-1">
      <div className="p-3 md:p-6 lg:p-5">
        <div className="pb-1">
          <div className="flex gap-2 items-center text-gray-900">
            <FaFolder className="text-gray-400" /> / Menus
          </div>
        </div>
        <div className="py-5">
          <div className="flex gap-2 items-center">
            <div className="bg-blue-600 p-4 rounded-full text-white">
              <FaFolder />
            </div>
            <h2 className="text-3xl font-bold">Menus</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-3">
            <div className="mb-7">
              <label className="text-slate-400">Menu</label>
              <select
                id="menu"
                name="menu"
                autocomplete="menu-name"
                class="block w-full rounded-xl bg-slate-50 border-slate-300 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={(e) => toggleMenuChange(e)}
              >
                {menuItems.map((node) => (
                  <option selected={node.id === menuExpand.id} value={node.id}>
                    {node.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                onClick={expandAll}
                className="px-7 py-1 bg-gray-950 text-white rounded-full outline outline-offset-1 outline-3"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-7 py-1 bg-white text-black rounded-full outline outline-offset-1 outline-1"
              >
                Collapse All
              </button>
            </div>

            <div className="flex gap-4 w-full py-2 text-left bg-white rounded cursor-pointer">
              <div
                className="flex w-full text-left py-2 cursor-pointer"
                onDoubleClick={() => handleSelect(menuExpand)}
              >
                {menuExpand.children && menuExpand.children.length > 0 && (
                  <span
                    className="ml-2 mt-2"
                    onClick={() => toggleNode(menuExpand.id)}
                  >
                    <SlArrowDown style={{ fontSize: "10px" }} />
                  </span>
                )}
                <span className="mx-3">{menuExpand.name}</span>
                <button
                  className="bg-blue-600 px-2 py-0 rounded-full text-white"
                  onClick={() => addNodes(menuExpand)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="ml-3 lg:ml-5">
              <MenuItem
                nodes={menuExpand.children}
                addNodes={addNodes}
                handleSelect={handleSelect}
                toggleNode={toggleNode}
                expandedNodes={expandedNodes}
              />
            </div>
          </div>
          <div className="">
            <AddMenu record={record} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
