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
import { db } from "../firebase";
import { Category } from "../../types";

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

export const deleteCategory = async (userId: string | undefined, categoryId: string) => {
  await deleteDoc(doc(db, `users/${userId}/categories/${categoryId}`));
};
