import { atom } from "recoil";

export const InputState = atom({
  key: 'inputState',
  default: {
    name: "Pendikary Token",
    symbol: "PTNK",
    initialSupply: 1,
    decimals: 18,
    initialSupplyRaw: "1000000000000000000"
  }
})

export const LoadingState = atom({
  key: "loadingState",
  default: false,
})

export const TokenDataState = atom({
  key: "tokenDataState",
  default: [
    { id: 0, name: "Address", value: ""},
    { id: 1, name: "Name", value: ""},
    { id: 2, name: "Symbol", value: ""},
    { id: 3, name: "TotalSupply", value: ""},
    { id: 4, name: "Decimals", value: ""},
    { id: 5, name: "Current Balance", value: ""},
  ]
})


export const MenuState = atom({
  key: "menuState",
  default: 0,
})