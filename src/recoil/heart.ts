import {atom} from "recoil";

export const heartListState = atom({
    key: "heartList",
    default: [0],
})