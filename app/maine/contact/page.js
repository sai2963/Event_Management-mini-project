import Contact_Details from "@/components/Contactdetails";
import Contact_Form from "@/components/contactform";
import PostMessage from "@/components/contactpost";


export default  function Contactus() {

  return (
    <>
    <Contact_Form action={PostMessage}/>
    <Contact_Details/>
    </>
  );
}
