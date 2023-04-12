import { useState } from "react";
import { SelectOption } from "../types";

type Option = SelectOption | null;

const useSelectInput = (initialValue: Option) => {
  const [option, setOption] = useState<Option>(initialValue);

  const onChangeOption = (option: SelectOption) => {
    setOption(option);
  };

  return [option, onChangeOption] as const;
};

export default useSelectInput;
