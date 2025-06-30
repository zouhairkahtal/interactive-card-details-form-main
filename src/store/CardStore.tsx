import { create } from "zustand";

type CardInfo = {
  CardholderName: string;
  CardNumber: string;
  MM: number;
  YY: number;
  CVC: number;
};

type CardStore = {
  isSubmitted: boolean;
  cardInfo: CardInfo;
  setSubmitted: (value: boolean) => void;
  setCardInfo: (data: CardInfo) => void;
};

export const useCardStore = create<CardStore>((set) => ({

  isSubmitted: false,
  cardInfo: {
    CardholderName: "",
    CardNumber: "",
    MM: 0,
    YY: 0,
    CVC: 0,
  },
  setSubmitted: (value) => set({ isSubmitted: value }),
  setCardInfo: (data) => set({ cardInfo: data }),
}));

