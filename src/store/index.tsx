import { atom } from "recoil";
import { AppStateType, Menu } from "../interface";
import { AlertType } from "../UI/Alert";

export const WalletState = atom({
  key: 'walletState',
  default: {
    connected: false,
    message: "",
    address: "",
  }
})

export const InputState = atom({
  key: 'inputState',
  default: {
    name: "Pendikary Token",
    symbol: "PTNK",
    initialSupply: 1,
    decimals: 18,
    initialSupplyRaw: "1000000000000000000",
  }
})

export const TokenDataState = atom({
  key: "tokenDataState",
  default: [
  ]
})

export const AppState = atom({
  key: "appState",
  default: {
    menu: Menu.MAIN,
    loading: false,
    message: "",
    alert: AlertType.DEFAULT,
  }
})

export const ViewingState = atom({
  key: "viewingState",
  default: {
    address: "",
    tokenData: []
  }
})