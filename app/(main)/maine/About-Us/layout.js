import Header from "components/header";

export const metadata = {
    title: "Team",
    description: "It's Our Team",
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