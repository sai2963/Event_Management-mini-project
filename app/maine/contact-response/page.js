import Response from "../../../components/response";
import { db } from "../../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

export default async function ContactResponse() {
  const ContactRef = collection(db, "Contact Data");
  const querySnapShot = await getDocs(ContactRef);
  const ContactData = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const data = JSON.parse(JSON.stringify(ContactData))

  if (!data.length) {
    throw new Error("Training Data Not Found");
  }

  return (
    <>
      <Response ContactData={data} />
    </>
  );
}