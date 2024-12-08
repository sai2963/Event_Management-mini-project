import Header from "components/header";

 export const metadata = {
    title: "Contact-Us",
    description: "What Events We Do",
  };
  

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    );
  }