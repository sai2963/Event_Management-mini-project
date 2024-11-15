import { db } from "@/firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
export default async function PostMessage(formData) {
    'use server'
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const event = formData.get("event");
  const description = formData.get("description");

  const Contact_Data = {
    firstname,
    lastname,
    phone,
    email,
    event,
    description,
    createdAt: new Date(),
  };

  if (!Contact_Data) {
    throw new Error("Retry After Some Time");
  }
  const docRef = await addDoc(collection(db, "Contact Data"), Contact_Data);
}
