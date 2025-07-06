import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  priceCountry: number;
}

export default function NewsletterPricing() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLegacyPricing, setShowLegacyPricing] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${url}News/get-all`);
        setNews(response.data);
      } catch (err) {
        setError("Failed to fetch pricing data");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  if (isLoading) {
    return (
      <div className="px-4 py-3">
        <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
          Newsletter Subscription
        </h2>
        <p className="text-[#575757] text-[16px] leading-relaxed mb-6">
          Stay informed with periodic updates on new projects tailored to your
          business activity and regions of interest.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg p-6 border border-[#91abe2]"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-3">
        <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
          Newsletter Subscription
        </h2>
        <p className="text-red-500 mb-6">{error}</p>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Basic Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              One country, 2 activities:{" "}
              <span className="text-[#B31942]">$200</span>
              <br />
              <span className="text-[#B31942]">$50</span> per additional
              activity
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Premium Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              Two countries, 2 activities:{" "}
              <span className="text-[#B31942]">$350</span>
              <br />
              <span className="text-[#B31942]">$75</span> per additional
              activity
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Enterprise Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              All Gulf countries, all activities:
              <span className="text-[#B31942]"> $1000 </span>
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
        Newsletter Subscription
      </h2>
      <p className="text-[#575757] text-[16px] leading-relaxed mb-6">
        Stay informed with periodic updates on new projects tailored to your
        business activity and regions of interest.
      </p>

      {/* Dynamic pricing cards from API */}
      <div className="grid grid-cols-1 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-[#91abe2] hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-[#0A3161] font-bold text-xl mb-3">
              {item.title}
            </h3>
            <p className="text-[#575757] mb-4">{item.description}</p>
            <div className="flex items-center mb-6">
              <span className="text-[#B31942] font-bold text-2xl">
                ${item.priceCountry.toFixed(2)}
              </span>
            </div>
            <Link href={`/newsletter_booking/${item.id}`}>
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Legacy pricing (hidden by default) */}
      {showLegacyPricing && (
        <div className="grid grid-cols-1 gap-6 mt-8 pt-8 border-t">
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Basic Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              One country, 2 activities:{" "}
              <span className="text-[#B31942]">$200</span>
              <br />
              <span className="text-[#B31942]">$50</span> per additional
              activity
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Premium Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              Two countries, 2 activities:{" "}
              <span className="text-[#B31942]">$350</span>
              <br />
              <span className="text-[#B31942]">$75</span> per additional
              activity
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Enterprise Package
            </h3>
            <p className="text-[#0A3161] font-bold mb-4">
              All Gulf countries, all activities:
              <span className="text-[#B31942]"> $1000 </span>
            </p>
            <Link href="/newsletter_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Pay Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
