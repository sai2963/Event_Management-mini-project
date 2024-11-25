import React from "react";

import { db } from "../../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

import UpEvents from "../../../components/upcomingeventscomp";

export const metadata = {
  title: "Upcoming Events",
  description: "The Next Upcoming Events",
};

export default async function UpcomingEvents() {
  const EventRef = collection(db, "Event Data");
  const querySnapShot = await getDocs(EventRef);
  const EventData = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const data = JSON.parse(JSON.stringify(EventData));

  if (!data.length) {
    throw new Error("Training Data Not Found");
  }

  return (
    <>
      <UpEvents EventData={data} />
    </>
  );
}
