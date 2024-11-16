"use client";
import AddEventForm from "@/components/addeventform";
import createEvent from "@/components/addeventpost";
import { useActionState } from "react";
const initialState = {
  message: null,
};
export default function AddEvent() {
  const [state, formAction] = useActionState(createEvent, initialState);
  return (
    <>
      <AddEventForm action={formAction} />
    </>
  );
}
