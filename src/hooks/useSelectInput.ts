import { useCallback, useState } from "react";
import { SelectOption } from "types";

type Option = SelectOption | null;

const useSelectInput = (initialValue: Option) => {
  const [option, setOption] = useState<Option>(initialValue);

  const handleChangeOption = useCallback((option: SelectOption) => {
    setOption(option);
  }, []);

  return [option, handleChangeOption] as const;
};

export default useSelectInput;
