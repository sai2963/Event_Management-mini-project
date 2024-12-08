import Header from "components/header";
export const metadata = {
  title: "Payment Success",
  description: "Your Payment Has Done Successfully",
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
