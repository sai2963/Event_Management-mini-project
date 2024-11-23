import { db } from "../../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import RegisteredPeople from '../../../components/registerdpeople';
export default async function Registerd_People() {
  const RegisterRef = collection(db, "Registered-Events");
  const querySnapShot = await getDocs(RegisterRef);
  const RegistrationData = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const data = JSON.parse(JSON.stringify(RegistrationData));

  if (!data.length) {
    throw new Error("Training Data Not Found");
  }
  return (
    <>
     <RegisteredPeople data={data} />;
    </>
  );
}
