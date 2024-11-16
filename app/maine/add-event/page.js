import AddEventForm from "@/components/addeventform";
import EventPost from "@/components/addeventpost";

export default function AddEvent() {
  return (
    <>
    <AddEventForm action={EventPost}/>
    </>
  );
}