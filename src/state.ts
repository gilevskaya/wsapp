import Recoil from "recoil";

import { ls } from "utils";

export const wsState = {
  url: Recoil.atom<string>({
    key: "ws.url",
    default: ls.getWsUrl() || "",
  }),
  readyState: Recoil.atom<number | null>({
    key: "ws.readyState",
    default: null,
  }),
  lastMessage: Recoil.atom<string | null>({
    key: "ws.lastMessage",
    default: null,
  }),
  sendMessage: Recoil.atom<Function | null>({
    key: "ws.sendMessage",
    default: null,
  }),
};
