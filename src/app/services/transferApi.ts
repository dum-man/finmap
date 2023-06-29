import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import { emptySplitApi } from "./emptySplitApi";
import { firestore } from "app/config";
import { Transfer } from "types";

const transferApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransfers: builder.query<Transfer[], string>({
      async queryFn(userId) {
        try {
          const accountsDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/transfers`),
              orderBy("createdAt", "desc")
            )
          );
          const accountsData = accountsDocs.docs.map((doc) => doc.data() as Transfer);
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
      providesTags: ["Transfers"],
    }),

    createTransfer: builder.mutation<null, { userId: string; transfer: Transfer }>({
      async queryFn({ userId, transfer }) {
        try {
          const batch = writeBatch(firestore);
          batch.set(doc(firestore, `users/${userId}/transfers/${transfer.id}`), transfer);
          batch.update(
            doc(firestore, `users/${userId}/accounts/${transfer.fromAccount.id}`),
            {
              balance: increment(-transfer.amount),
            }
          );
          batch.update(
            doc(firestore, `users/${userId}/accounts/${transfer.toAccount.id}`),
            {
              balance: increment(transfer.amount),
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
      invalidatesTags: ["Accounts", "Transfers"],
    }),

    cancelTransfer: builder.mutation<null, { userId: string; transfer: Transfer }>({
      async queryFn({ userId, transfer }) {
        try {
          const batch = writeBatch(firestore);
          batch.delete(doc(firestore, `users/${userId}/transfers/${transfer.id}`));
          batch.update(
            doc(firestore, `users/${userId}/accounts/${transfer.fromAccount.id}`),
            {
              balance: increment(transfer.amount),
            }
          );
          batch.update(
            doc(firestore, `users/${userId}/accounts/${transfer.toAccount.id}`),
            {
              balance: increment(-transfer.amount),
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
      invalidatesTags: ["Accounts", "Transfers"],
    }),
  }),
});

export const {
  useGetTransfersQuery,
  useCreateTransferMutation,
  useCancelTransferMutation,
} = transferApi;
