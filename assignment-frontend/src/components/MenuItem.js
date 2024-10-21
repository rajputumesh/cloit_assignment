import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

const MenuItem = ({
  nodes,
  addNodes,
  handleSelect,
  toggleNode,
  expandedNodes,
}) =>
  nodes &&
  nodes.map((node, index) => (
    <div
      key={node.id}
      className={
        nodes.length === index + 1 ? "tree borderHalf" : "tree borderTree"
      }
    >
      <div className="tree-node">
        <div
          className="tree-branch flex w-full text-left py-2 cursor-pointer"
          onDoubleClick={() => handleSelect(node)}
        >
          {node.children.length > 0 && (
            <span className="ml-4 mt-2" onClick={() => toggleNode(node.id)}>
              {expandedNodes[node.id] ? (
                <SlArrowDown style={{ fontSize: "10px" }} />
              ) : (
                <SlArrowRight style={{ fontSize: "10px" }} />
              )}
            </span>
          )}
          <span className="mx-3">{node.name}</span>
          <button
            className="bg-blue-600 px-2 py-0 rounded-full text-white"
            onClick={() => addNodes(node)}
          >
            +
          </button>
        </div>
        <div className="ml-7">
          {node.children && expandedNodes[node.id] && (
            <MenuItem
              addNodes={addNodes}
              nodes={node.children}
              handleSelect={handleSelect}
              toggleNode={toggleNode}
              expandedNodes={expandedNodes}
            />
          )}
        </div>
      </div>
    </div>
  ));

export default MenuItem;
