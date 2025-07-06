import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

function Ready() {
  const [showIframe, setShowIframe] = useState(false);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [consultation, setConsultation] = useState<string | null>(null);
  useEffect(() => {
    const fetchConsultation = async () => {
      const response = await axios.get(`${url}Consultation/get-all`);
      setConsultation(response.data[0].link);
    };
    fetchConsultation();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mt-5 ">
        <h1 className="text-[#0A3161] text-xl font-bold">
          Ready to Start Your Own Success Story?
        </h1>
        <button
          onClick={() => setShowIframe(true)}
          className="bg-[#0A3161] py-3 px-4  min-w-[200px] rounded-sm text-sm group flex justify-center items-center  cursor-pointer text-white  shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Book Consultation
        </button>
      </div>

      {/* الـ iframe Popup */}
      {showIframe && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-white w-[90%] md:w-[80%] h-[90%] rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setShowIframe(false)}
              className="absolute top-2 right-2 z-50 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
            >
              <X />
            </button>
            <iframe
              src={consultation || ""}
              title="Book Consultation"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Ready;
