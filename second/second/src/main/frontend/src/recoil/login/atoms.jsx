import { atom } from "recoil";

export const loginState = atom({
  key: "isLogin",
  default: false,
});
