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
import { Category } from "types";

export const categoryApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const categoriesDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/categories`),
              orderBy("label", "asc")
            )
          );
          const categoriesData = categoriesDocs.docs.map((doc) => doc.data() as Category);
          return {
            data: categoriesData,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      providesTags: ["Categories"],
    }),

    checkCategoryExists: builder.query<
      boolean,
      { userId: string; label: string; type: string }
    >({
      async queryFn({ userId, label, type }) {
        try {
          const categoryDocs = await getDocs(
            query(
              collection(firestore, `users/${userId}/categories`),
              where("label", "==", label),
              where("type", "==", type)
            )
          );
          if (categoryDocs.empty) {
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

    createCategory: builder.mutation<Category, { userId: string; category: Category }>({
      async queryFn({ userId, category }) {
        try {
          await setDoc(
            doc(firestore, `users/${userId}/categories/${category.id}`),
            category
          );
          return {
            data: category,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<null, { userId: string; categoryId: string }>({
      async queryFn({ userId, categoryId }) {
        try {
          await deleteDoc(doc(firestore, `users/${userId}/categories/${categoryId}`));
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
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyCheckCategoryExistsQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
