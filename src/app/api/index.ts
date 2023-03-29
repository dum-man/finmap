import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Account, Category, Transaction, Transfer } from "../../types";
import { db } from "../../firebase";

export const getAccounts = async (userId: string | undefined): Promise<Account[]> => {
  const accountsDocs = await getDocs(
    query(collection(db, `users/${userId}/accounts`), orderBy("balance", "desc"))
  );
  const accountsData = accountsDocs.docs.map((doc) => doc.data() as Account);
  return accountsData;
};

export const getTransactions = async (
  userId: string | undefined
): Promise<Transaction[]> => {
  const transactionsDocs = await getDocs(
    query(collection(db, `users/${userId}/transactions`), orderBy("createdAt", "desc"))
  );
  const transactionsData = transactionsDocs.docs.map((doc) => doc.data() as Transaction);
  return transactionsData;
};

export const getTransfers = async (userId: string | undefined): Promise<Transfer[]> => {
  const accountsDocs = await getDocs(
    query(collection(db, `users/${userId}/transfers`), orderBy("createdAt", "desc"))
  );
  const accountsData = accountsDocs.docs.map((doc) => doc.data() as Transfer);
  return accountsData;
};

export const getCategories = async (userId: string | undefined): Promise<Category[]> => {
  const categoriesDocs = await getDocs(
    query(collection(db, `users/${userId}/categories`), orderBy("label", "asc"))
  );
  const categoriesData = categoriesDocs.docs.map((doc) => doc.data() as Category);
  return categoriesData;
};

export const createCategory = async (userId: string | undefined, category: Category) => {
  const categoryDocs = await getDocs(
    query(
      collection(db, `users/${userId}/categories`),
      where("label", "==", category.label)
    )
  );
  if (categoryDocs.empty) {
    await setDoc(doc(db, `users/${userId}/categories/${category.id}`), category);
  } else {
    throw new Error(`You already have "${category.label}" category`);
  }
};
