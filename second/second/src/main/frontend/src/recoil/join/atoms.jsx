import { atom } from "recoil";

export const joinState = atom({
  key: "join",
  default: {
    email: "",
    id: "",
    password: "",
    birth: "",
    gender: "",
  },
});
