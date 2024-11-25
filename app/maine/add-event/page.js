"use client";
// export const metadata = {
//   title: "Add Event",
//   description: "You Can Add Your Events Here",
// };

import createEvent from "../../../components/addeventpost";
import { useActionState } from "react";
import AddEventForm from "../../../components/addeventform";
const initialState = {
  message: null,
};
export default function AddEvent() {
  const [state, formAction] = useActionState(createEvent, initialState);
  return (
    <>
      <AddEventForm action={createEvent} state={state}/>
    </>
  );
}
