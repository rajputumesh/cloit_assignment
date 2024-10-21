export const BASE_URL = "https://cloit.mkite.in/backend/public/api";

export const addNewMenuItem = (prevMenuItems, newArray, parentId) => {
  if (parentId == null) {
    return [...prevMenuItems, newArray];
  }

  return prevMenuItems.map((menuItem) => {
    if (menuItem.id === parentId) {
      return {
        ...menuItem,
        children: [...menuItem.children, newArray],
      };
    } else if (menuItem.children) {
      return {
        ...menuItem,
        children: menuItem.children.map((childItem) => {
          if (childItem.id === parentId) {
            return {
              ...childItem,
              children: [...childItem.children, newArray],
            };
          }
          return childItem;
        }),
      };
    }
    return menuItem;
  });
};

export const updateMenuItems = (prevMenuItems, newItem) => {
  return prevMenuItems.map((item) => {
    if (item.id === newItem.id) {
      return newItem;
    }

    if (item.children) {
      return { ...item, children: updateMenuItems(item.children, newItem) };
    }

    return item;
  });
};

export const deleteMenuItem = (prevMenuItems, itemIdToDelete) => {
  return prevMenuItems
    .map((item) => {
      // Create a new item object to avoid mutating the original
      const newItem = { ...item };

      // If the item has children, recursively delete from the children
      if (newItem.children) {
        newItem.children = deleteMenuItem(newItem.children, itemIdToDelete);
      }

      // Return the item only if it's not the one to delete
      return newItem.id === itemIdToDelete ? null : newItem;
    })
    .filter((item) => item !== null); // Filter out the deleted items
};
