"use client";
import { use } from "react";
import EventFetcher from "../../../../../components/EventFetcher";
import RegisterEvent from "../../../../../components/registereventpost";
import RegisterEventForm from "../../../../../components/registereventform";
import { useRouter } from "next/navigation";
export default function EventRegistration({ params }) {
 
  const EventId = use(params).slugg;

  return (
    <EventFetcher EventId={EventId}>
      {(exploreEvent) => (
        <>
          <RegisterEventForm
            action={RegisterEvent}
            exploreEvent={exploreEvent}
            EventId={EventId}
          />
        </>
      )}
    </EventFetcher>
  );
}
