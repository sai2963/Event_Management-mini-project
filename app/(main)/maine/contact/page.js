import Contact_Details from "../../../../components/Contactdetails";
import Contact_Form from "../../../../components/contactform";
import PostMessage from "../../../../components/contactpost";
export const metadata = {
  title: "Contact-Us",
  description: "You Can Contact Us for Your Event Management",
};

export default  function Contactus() {

  return (
    <>
    <Contact_Form action={PostMessage}/>
    <Contact_Details/>
    </>
  );
}
