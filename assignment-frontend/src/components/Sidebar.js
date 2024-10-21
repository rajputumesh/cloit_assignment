import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import menuopen from "../menuopen.png";
import { FaRegFolder } from "react-icons/fa";
import { menuState } from "../recoil-states";
import menuService from "../services/menuService";
import { useRecoilState } from "recoil";

const Sidebar = () => {
  const [menuItems, setMenuItems] = useRecoilState(menuState);
  const [isOpen, setIsOpen] = useState(false); // Tracks sidebar open/close state
  const [isLeft, setIsLeft] = useState(true); // Tracks sidebar position (left or right)
  const [active, setActive] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const getMenus = () => {
    const resp = menuService.manuList();
    resp
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMenuItems(res);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMenus();
  }, []);

  // Toggles sidebar open/close on mobile
  const handleToggleSidebar = () => setIsOpen(!isOpen);

  // Toggles sidebar position between left and right
  const handleTogglePosition = () => setIsLeft(!isLeft);

  return (
    <div>
      {/* Overlay for mobile view */}
      {isOpen && (
        <div className="md:hidden z-40" onClick={handleToggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={` ${
          isLeft ? "left-0" : "right-0"
        } h-full bg-gray-900 text-white w-64 
        transition-transform transform rounded-3xl z-50 md:translate-x-0 
        ${
          isOpen
            ? "translate-x-0"
            : isLeft
            ? "-translate-x-full"
            : "translate-x-full"
        } 
        md:relative`}
      >
        <div className="flex items-center justify-between p-6">
          {/* Heading with Position Toggle Button */}
          <button
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={handleTogglePosition}
          >
            <img src={logo} />
          </button>
          <img src={menuopen} className="hidden lg:block md:block" />
          {/* Close Button for Mobile */}
          <div className="flex md:hidden">
            <button className="text-white" onClick={handleToggleSidebar}>
              X
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-4 space-y-2">
          <ul>
            {menuItems.map((node) => (
              <li
                key={node.id}
                className={` ${
                  node.id === active ? "bg-slate-800 pb-1" : ""
                } rounded-xl`}
              >
                <button
                  className={`mb-3 flex items-center gap-2 p-2 rounded-xl w-full w-full font-semibold text-base ${
                    node.id === active ? "text-white" : "text-slate-500"
                  }`}
                  onClick={() => setActive(node.id)}
                >
                  <Link to="/" className="flex items-center gap-3 pl-3">
                    <FaRegFolder /> {node.name}
                  </Link>
                </button>
                <ul hidden={node.id !== active}>
                  {node.children.map((node) => (
                    <li key={node.id} className="mb-3">
                      <button
                        className={`flex items-center gap-2 p-2 rounded-xl w-full w-full font-semibold text-base ${
                          node.id == activeLink
                            ? "bg-lime-400 text-black"
                            : "text-slate-500"
                        }`}
                        onClick={() => setActiveLink(node.id)}
                      >
                        <Link
                          to="/"
                          className="flex items-center gap-3 pl-3"
                        >
                          <FaRegFolder /> {node.name}
                        </Link>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="flex md:hidden bg-gray-900 text-white w-100 p-4 justify-between">
        <img src={logo} />
        <button
          className="z-30 text-white md:hidden"
          onClick={handleToggleSidebar}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
