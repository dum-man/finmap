import { createContext, SetStateAction, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import useSortReducer from "../hooks/useSortReducer";
import { Account, DatepickerDate, SelectOption, SortState } from "../types";

export interface Context {
  sidebarOpen: boolean;
  setSidebarOpen: (open: SetStateAction<boolean>) => void;
  selectedTab: string;
  setSelectedTab: (tab: SetStateAction<string>) => void;
  selectedAccounts: Account[];
  setSelectedAccounts: (accounts: SetStateAction<Account[]>) => void;
  sortState: SortState;
  sortDispatch: (type: string) => void;
  selectedOption: SelectOption;
  setSelectedOption: (option: SetStateAction<SelectOption>) => void;
  searchQuery: string;
  setSearchQuery: (query: SetStateAction<string>) => void;
  selectedDates: DatepickerDate;
  setSelectedDates: (dates: SetStateAction<DatepickerDate>) => void;
}

export const AppContext = createContext<Context | null>(null);

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
  const [selectedTab, setSelectedTab] = useState("actions");
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);

  const [selectedOption, setSelectedOption] = useState<SelectOption>({
    id: "5",
    group: "base",
    label: "allTime",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDates, setSelectedDates] = useState<DatepickerDate>(null);

  const { sortState, sortDispatch } = useSortReducer();

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        selectedTab,
        setSelectedTab,
        selectedAccounts,
        setSelectedAccounts,
        sortState,
        sortDispatch,
        selectedOption,
        setSelectedOption,
        searchQuery,
        setSearchQuery,
        selectedDates,
        setSelectedDates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
