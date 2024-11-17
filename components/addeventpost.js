"use server";

import { db } from "../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";

export default async function createEvent(formData) {
  try {
    const Event_Data = {
      organization: formData.get("organization"),
      event: formData.get("event"),
      imageUrl: formData.get("imageUrl"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      shortnote: formData.get("short-note"),
      description: formData.get("description"),
      name: formData.get("name"),
      fee: formData.get("fee"),
      createdAt: new Date(),
    };

    if (!Event_Data.organization || !Event_Data.event) {
      return { error: "Organization and Event fields are required" };
    }

    const docRef = await addDoc(collection(db, "Event Data"), Event_Data);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding event to Firestore:", error);
    return { error: error.message };
  }
}
