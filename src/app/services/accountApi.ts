import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { emptySplitApi } from "./emptySplitApi";
import { firestore } from "app/config";
import { Account } from "types";

export const accountApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], string>({
      async queryFn(userId) {
        try {
          const accountsDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/accounts`),
              orderBy("balance", "desc")
            )
          );
          const accountsData = accountsDocs.docs.map((doc) => doc.data() as Account);
          return {
            data: accountsData,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      providesTags: ["Accounts"],
    }),

    checkAccountExists: builder.query<boolean, { userId: string; name: string }>({
      async queryFn({ userId, name }) {
        try {
          const accountDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/accounts`),
              where("name", "==", name)
            )
          );
          if (accountDocs.empty) {
            return {
              data: false,
            };
          }
          return {
            data: true,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
    }),

    createAccount: builder.mutation<null, { userId: string; account: Account }>({
      async queryFn({ userId, account }) {
        try {
          await setDoc(doc(firestore, `users/${userId}/accounts/${account.id}`), account);
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
      invalidatesTags: ["Accounts"],
    }),

    deleteAccount: builder.mutation<null, { userId: string; accountId: string }>({
      async queryFn({ userId, accountId }) {
        try {
          await deleteDoc(doc(firestore, `users/${userId}/accounts`, accountId));
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
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useLazyCheckAccountExistsQuery,
  useCreateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
