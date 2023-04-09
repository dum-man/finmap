import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import { Transaction } from "../../types";
import { emptySplitApi } from "./emptySplitApi";
import { firestore } from "../../firebase";

export const transactionApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], string>({
      async queryFn(userId) {
        try {
          const transactionsDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/transactions`),
              orderBy("createdAt", "desc")
            )
          );
          const transactionsData = transactionsDocs.docs.map(
            (doc) => doc.data() as Transaction
          );
          return {
            data: transactionsData,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      providesTags: ["Transactions"],
    }),

    createTransaction: builder.mutation<
      null,
      { userId: string; transaction: Transaction }
    >({
      async queryFn({ userId, transaction }) {
        try {
          const batch = writeBatch(firestore);
          batch.set(
            doc(firestore, `users/${userId}/transactions/${transaction.id}`),
            transaction
          );
          batch.update(
            doc(firestore, `users/${userId}/accounts/${transaction.accountId}`),
            {
              balance: increment(transaction.amount),
            }
          );
          await batch.commit();
          return {
            data: null,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Accounts", "Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useCreateTransactionMutation,
} = transactionApi;
