import { atom, selector } from "recoil";

export const cartState = atom({
  key: 'cartState',
  default: [],
});

export const cartCountState = atom({
  key: 'cartCountState',
  default: 0
});