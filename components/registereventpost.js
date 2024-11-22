"use server";
import { db } from "../firebase/clientApp"; 
import { addDoc, collection } from "firebase/firestore";
import { redirect } from "next/navigation";

export default async function RegisterEvent(formData) {
  try {
    // Convert FormData to plain object
    const Registration_Data = {
      organization: formData.get("organization"),
      event: formData.get("event"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      name: formData.get("name"),
      createdAt: new Date().toISOString(),
    };

    // Validation
    const errors = [];
    Object.entries(Registration_Data).forEach(([key, value]) => {
      if (!value || (typeof value === 'string' && value.trim().length === 0)) {
        errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
      }
    });

    if (errors.length > 0) {
      return { 
        success: false, 
        errors 
      };
    }

    // Add document to Firestore
    const docRef = await addDoc(
      collection(db, "Registered-Events"), 
      Registration_Data
    );
    
    return { 
      success: true, 
      id: docRef.id 
    };

  } catch (error) {
    console.error("Error adding event to Firestore:", error);
    return {
      success: false,
      errors: [error.message || "An error occurred while creating the event"],
    };
  }
}