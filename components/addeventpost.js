"use server";

import { redirect } from "next/navigation";
import { db } from "../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default async function createEvent(formData) {
  try {
    const Event_Data = {
      organization: formData.get("organization"),
      event: formData.get("event"),
      eventdate: formData.get("eventdate"),
      imageUrl: formData.get("imageUrl"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      shortnote: formData.get("shortnote"),
      description: formData.get("description"),
      name: formData.get("name"),
      fee: formData.get("fee"),
      createdAt: new Date(),
    };

    // Validate required fields
    let errors = [];
    if (!Event_Data.organization && Event_Data.organization.trim().length==0) {
      errors.push("Organization is required");
    }
    if (!Event_Data.event) {
      errors.push("Event name is required");
    }
    if (!Event_Data.eventdate) {
      errors.push("Event date is required");
    }
    if (!Event_Data.email) {
      errors.push("Email is required");
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Add document to Firestore
    const docRef = await addDoc(collection(db, "Event Data"), Event_Data);
    
    // Revalidate the upcoming events page
    revalidatePath("/maine/upcoming-events");
    
    // Return success result
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding event to Firestore:", error);
    return { 
      success: false, 
      errors: [error.message || "An error occurred while creating the event"] 
    };
  }
}