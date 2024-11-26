//import { EdgeStoreProvider } from "@edgestore/server/providers/edgestore";
import Header from "../../../components/header";
import { EdgeStoreProvider } from "../../../lib/edgestore";
import "./globals.css";
export const metadata = {
  title: "Home",
  description: "Generated by create next app",
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
