import { db, storage } from "@/firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default async function EventPost(formData) {
  "use server";
  const organization = formData.get("organization");
  const event = formData.get("event");
  const image = formData.get("image");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const shortnote = formData.get("short-note");
  const description = formData.get("description");
  const name = formData.get("name");
  const fee = formData.get("fee");

  const StorageRef=ref(storage,`images/${image.name}`)
  await uploadBytes(StorageRef,image,{content:image.type});
  const imageUrl=await getDownloadURL(StorageRef);
  const Event_Data = {
    organization,
    event,
    imageUrl,
    phone,
    email,
    shortnote,
    description,
    name,
    fee,
    createdAt: new Date(),
  };

  

  if (!Event_Data) {
    throw new Error("Retry After Some Time");
  }
  const docRef = await addDoc(collection(db, "Event Data"), Event_Data);
}
