import Image from "next/image";
import { redirect } from "next/navigation";

// export default function Home() {
//   return (
//     <div className="flex items-center justify-center bg-white  h-screen">
//       <h1 className="main-text">بسم الله نبدا </h1>
//     </div>
//   );
// }

export default function Home() {
  redirect("/home"); // علشان يفتح صفحة الموقع
}
