import { Timestamp, doc, getDoc, updateDoc, writeBatch } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { emptySplitApi } from "./emptySplitApi";
import { firestore } from "app/config";
import { DEFAULT_ACCOUNTS, DEFAULT_CATEGORIES } from "app/constants";
import { Account } from "types";

const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createUserDocument: builder.mutation<null, { userId: string; email: string | null }>({
      async queryFn({ userId, email }) {
        try {
          const batch = writeBatch(firestore);
          batch.set(doc(firestore, `users/${userId}`), {
            userId,
            email,
          });
          DEFAULT_ACCOUNTS.forEach((name) => {
            const account: Account = {
              id: uuidv4(),
              group: "base",
              name,
              balance: 0,
              createdAt: Timestamp.now(),
            };
            batch.set(doc(firestore, `users/${userId}/accounts/${account.id}`), account);
          });
          DEFAULT_CATEGORIES.forEach((item) => {
            const category = {
              id: uuidv4(),
              group: "base",
              type: item.type,
              label: item.label,
              createdAt: Timestamp.now(),
            };
            batch.set(
              doc(firestore, `users/${userId}/categories/${category.id}`),
              category
            );
          });
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
    }),

    checkUserExists: builder.query<boolean, string>({
      async queryFn(userId) {
        try {
          const userDoc = await getDoc(doc(firestore, `users/${userId}`));
          if (userDoc.exists()) {
            return {
              data: true,
            };
          } else {
            return {
              data: false,
            };
          }
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
    }),

    updateUserProfile: builder.mutation<null, { userId: string; displayName: string }>({
      async queryFn({ userId, displayName }) {
        try {
          await updateDoc(doc(firestore, `users/${userId}`), {
            displayName,
          });
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
    }),
  }),
});

export const {
  useCreateUserDocumentMutation,
  useLazyCheckUserExistsQuery,
  useUpdateUserProfileMutation,
} = userApi;
