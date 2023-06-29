import { useReducer } from "react";
import { NumberFormatValues } from "react-number-format";
import { SelectOption } from "types";

enum FormActionTypes {
  TO_ACCOUNT = "TO_ACCOUNT",
  FROM_ACCOUNT = "FROM_ACCOUNT",
  CATEGORY = "CATEGORY",
  AMOUNT = "AMOUNT",
  DATE = "DATE",
  COMMENT = "COMMENT",
}

interface FormAction {
  type: FormActionTypes;
  payload: string | Date | SelectOption;
}

interface FormState {
  toAccount: SelectOption | null;
  fromAccount: SelectOption | null;
  category: SelectOption | null;
  amount: string;
  date: Date;
  comment: string;
}

const useTransactionForm = () => {
  const initialFormState = {
    toAccount: null,
    fromAccount: null,
    category: null,
    amount: "",
    date: new Date(),
    comment: "",
  };

  const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
      case FormActionTypes.TO_ACCOUNT:
        return {
          ...state,
          toAccount: action.payload as SelectOption,
        };
      case FormActionTypes.FROM_ACCOUNT:
        return {
          ...state,
          fromAccount: action.payload as SelectOption,
        };
      case FormActionTypes.CATEGORY:
        return {
          ...state,
          category: action.payload as SelectOption,
        };
      case FormActionTypes.AMOUNT:
        return {
          ...state,
          amount: action.payload as string,
        };
      case FormActionTypes.DATE:
        return {
          ...state,
          date: action.payload as Date,
        };
      case FormActionTypes.COMMENT:
        return {
          ...state,
          comment: action.payload as string,
        };
      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const handleChangeToAccount = (option: SelectOption) => {
    formDispatch({
      type: FormActionTypes.TO_ACCOUNT,
      payload: option,
    });
  };

  const handleChangeFromAccount = (option: SelectOption) => {
    formDispatch({
      type: FormActionTypes.FROM_ACCOUNT,
      payload: option,
    });
  };

  const handleChangeCategory = (option: SelectOption) => {
    formDispatch({
      type: FormActionTypes.CATEGORY,
      payload: option,
    });
  };

  const handleChangeAmount = (values: NumberFormatValues) => {
    formDispatch({
      type: FormActionTypes.AMOUNT,
      payload: values.value,
    });
  };

  const handleChangeDate = (date: Date) => {
    formDispatch({
      type: FormActionTypes.DATE,
      payload: date,
    });
  };

  const handleChangeComment = (evt: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: FormActionTypes.COMMENT,
      payload: evt.target.value,
    });
  };

  return {
    formState,
    handleChangeToAccount,
    handleChangeFromAccount,
    handleChangeAmount,
    handleChangeCategory,
    handleChangeDate,
    handleChangeComment,
  };
};

export default useTransactionForm;
