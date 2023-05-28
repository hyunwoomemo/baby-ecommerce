import { atom, selector } from "recoil";

export const addProductState = atom({
  key: 'addProductState',
  default: false,
});

export const addProductSelector = selector({
  key: 'addProductSelector',
  get: ({ get }) => {
    const addProduct = get(addProductState);

    return addProduct;
  }
})