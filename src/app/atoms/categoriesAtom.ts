import { atom } from "recoil";
import { Category } from "../../types";

interface CategoriesState {
  categories: {
    income: Category[];
    expense: Category[];
  };
}

const defaultCategoriesState: CategoriesState = {
  categories: {
    income: [],
    expense: [],
  },
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});
