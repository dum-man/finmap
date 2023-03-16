import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { auth } from "./app/firebase";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./app/ProtectedRoute";
import AuthRoute from "./app/AuthRoute";
import { useSetRecoilState } from "recoil";
import { accountsState } from "./app/atoms/accountsAtom";
import { transactionsState } from "./app/atoms/transactionsAtom";
import { transfersState } from "./app/atoms/transfersAtom";
import { categoriesState } from "./app/atoms/categoriesAtom";
import { getAccounts } from "./app/service/accountsService";
import { getTransactions } from "./app/service/transactionsService";
import { getTransfers } from "./app/service/transfersService";
import { getCategories } from "./app/service/categoriesService";

const App: React.FC = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const [currentUser] = useAuthState(auth);

  const setAccountsStateValue = useSetRecoilState(accountsState);
  const setTransactionsStateValue = useSetRecoilState(transactionsState);
  const setTransfersStateValue = useSetRecoilState(transfersState);
  const setCategoriesStateValue = useSetRecoilState(categoriesState);

  const getUserAccounts = async () => {
    try {
      const accountsData = await getAccounts(currentUser?.uid);
      setAccountsStateValue((prev) => ({
        ...prev,
        accounts: accountsData,
      }));
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error while fetching accounts");
    }
  };

  const getUserTransactions = async () => {
    try {
      const transactionsData = await getTransactions(currentUser?.uid);
      setTransactionsStateValue((prev) => ({
        ...prev,
        isFetching: false,
        transactions: transactionsData,
      }));
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error while fetching transactions");
    }
  };

  const getUserTransfers = async () => {
    try {
      const transfersData = await getTransfers(currentUser?.uid);
      setTransfersStateValue((prev) => ({
        ...prev,
        transfers: transfersData,
      }));
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error while fetching transfers");
    }
  };

  const getUserCategories = async () => {
    try {
      const categoriesData = await getCategories(currentUser?.uid);
      setCategoriesStateValue((prev) => ({
        ...prev,
        categories: {
          income: [...categoriesData.filter((category) => category.type === "income")],
          expense: [...categoriesData.filter((category) => category.type === "expense")],
        },
      }));
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUserAccounts();
      getUserTransactions();
      getUserTransfers();
      getUserCategories();
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="*"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
