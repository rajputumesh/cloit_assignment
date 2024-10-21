import { atom, selector } from "recoil";

const menuState = atom({
  key: "menuState",
  default: [],
});

const todoListStatsState = selector({
    key: "todoListStatsState",
    get: ({ get }) => {
        return get(menuState);
    }
})

export { menuState, todoListStatsState };
