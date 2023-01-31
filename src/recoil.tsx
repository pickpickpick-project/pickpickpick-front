import { atom } from "recoil";


export const inquiryBoardCurrentPage = atom<number>({
    key : 'inquiryBoardCurrentPage',
    default : 1,
});

export const inquiryBoardPostPerPage = atom<number>({
    key : 'inquiryBoardPostPerPage',
    default : 5,
});

