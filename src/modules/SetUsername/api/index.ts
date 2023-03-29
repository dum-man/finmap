import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const updateUserProfile = async (
  userId: string | undefined,
  displayName: string,
  updateProfile: (profile: { displayName: string }) => Promise<boolean>
) => {
  await updateProfile({
    displayName,
  });
  await updateDoc(doc(db, `users/${userId}`), {
    displayName,
  });
};
