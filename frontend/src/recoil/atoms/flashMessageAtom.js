// frontend/src/recoil/atoms/flashMessageAtom.js

import { atom } from "recoil";

export const flashMessageState = atom({
  key: "flashMessageState",
  default: null, // { type: "success" | "error" | "info" | "warnning", text: string }
});
