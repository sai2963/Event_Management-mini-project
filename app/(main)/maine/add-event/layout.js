import Header from "components/header";
export const metadata = {
    title: "Add Event",
    description: "You can add any real live Events",
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