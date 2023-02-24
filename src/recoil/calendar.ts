import {atom} from "recoil";

export const startDateState = atom({
    key: "startDate",
    default: "",
})

export const endDateState = atom({
    key: "endDate",
    default: "",
})