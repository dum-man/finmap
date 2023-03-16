import { atom } from "recoil";
import { Transfer } from "../../types";

interface TransfersState {
  transfers: Transfer[];
}

const defaultTransfersState: TransfersState = {
  transfers: [],
};

export const transfersState = atom<TransfersState>({
  key: "transfersState",
  default: defaultTransfersState,
});
