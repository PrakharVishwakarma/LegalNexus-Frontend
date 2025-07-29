import { atom } from "recoil";

export const authTokenState = atom({
  key: "authTokenState",
  default: localStorage.getItem("token") || null,
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: !!localStorage.getItem("token"),
});
