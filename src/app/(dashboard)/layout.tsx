import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import SidBar from "./components/SidBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    redirect("/home");
  }

  console.log("Token from cookies:", token);
  return (
    <html>
      <body>
        <div className="flex">
          <div className=" min-h-screen">
            <SidBar />
          </div>
          <div className="flex-1 max-w-[1900px]">
            <NavBar />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
