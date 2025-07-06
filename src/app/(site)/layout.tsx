import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// import NextTopLoader from "nextjs-toploader";
import IconeWhatSapp from "@/src/components/IconeWhatSapp";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="">
        {/* <NextTopLoader color="#1565C7" height={3} showSpinner={false} /> */}
        <NavBar />
        <div>{children}</div>
        <Footer />
        <IconeWhatSapp />
      </body>
    </html>
  );
}
