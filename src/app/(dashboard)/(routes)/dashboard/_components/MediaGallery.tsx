"use client";

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AOS from "aos";
import "aos/dist/aos.css";

import HeaderTab from "./Tabs/HeaderTab";
import ContactTab from "./Tabs/ContactTab";
import SocialMediaTap from "./Tabs/SocialMediaTap";
import ServicesTap from "./Tabs/ServicesTap";
import PaymentTap from "./Tabs/PaymentTap";
import EventsTap from "./Tabs/EventsTap";
import StoriesTap from "./Tabs/StoriesTap";
import Services_NewsTap from "./Tabs/Services_NewsTap";
import Services_WebinarTap from "./Tabs/Services_WebinarTap";
import AboutTap from "./Tabs/AboutTap";
import AboutusSectionTap from "./Tabs/AboutusSectionTap";
import AboutusElementsTap from "./Tabs/AboutusElementsTap";
import TeamTap from "./Tabs/TeamTap";
import LatestNews from "./Tabs/LatestNews";
import CountryTap from "./Tabs/CountryTap";

type TabName =
  | "Header"
  | "Contact"
  // | "SocialMedia"
  // | "Services"
  // | "ServicesNews"
  // | "ServicesWebinar"
  // | "About"
  // | "AboutusSection"
  // | "AboutusElements"
  // | "Payment"
  | "EventsPhoto"
  // | "Stories"
  | "OurClients"
  | "LatestNews";
// | "Country";

const tabNames: TabName[] = [
  "Header",
  "Contact",
  // "SocialMedia",
  // "Services",
  // "ServicesNews",
  // "ServicesWebinar",
  // "About",
  // "AboutusSection",
  // "AboutusElements",
  // "Payment",
  // "Stories",
  "OurClients",
  "LatestNews",
  "EventsPhoto",
  // "Country",
];

interface FormData {
  title: string;
  subtitle: string;
  headerButtonText: string;
  image: File | null;
}

interface TabProps {
  tabName: TabName;
  data: any;
  onChange: (data: any) => void;
}

export default function MediaGallery() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  // إعادة تهيئة AOS كلما تغير التاب
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [activeTabIndex]);

  const tabComponents: Record<TabName, React.FC<TabProps>> = {
    Header: HeaderTab,
    Contact: ContactTab,
    // SocialMedia: SocialMediaTap,
    // Services: ServicesTap,
    // ServicesNews: Services_NewsTap,
    // ServicesWebinar: Services_WebinarTap,
    // About: AboutTap,
    // AboutusSection: AboutusSectionTap,
    // AboutusElements: AboutusElementsTap,
    // Payment: PaymentTap,
    // Stories: StoriesTap,
    OurClients: TeamTap,
    LatestNews: LatestNews,
    EventsPhoto: EventsTap,
    // Country: CountryTap,
  };

  const [formsData, setFormsData] = useState<Record<string, FormData>>(() => {
    const initial: Record<string, FormData> = {};
    tabNames.forEach((name) => {
      initial[name] = {
        title: "",
        subtitle: "",
        headerButtonText: "",
        image: null,
      };
    });
    return initial;
  });

  const handleFormChange = (tab: string, data: FormData) => {
    setFormsData((prev) => ({
      ...prev,
      [tab]: data,
    }));
  };

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden mt-6">
      <Tabs
        selectedIndex={activeTabIndex}
        onSelect={(index) => setActiveTabIndex(index)}
      >
        <TabList className="flex flex-wrap justify-center gap-4 mb-6 text-[#0A3161] font-semibold">
          {tabNames.map((name) => (
            <Tab
              key={name}
              className="px-4 py-2 cursor-pointer hover:text-[#1565C7] focus:outline-none"
            >
              {name}
            </Tab>
          ))}
        </TabList>

        {tabNames.map((name, index) => {
          const TabComp = tabComponents[name];
          return (
            <TabPanel key={name}>
              <div data-aos="zoom-in">
                <TabComp
                  tabName={name}
                  data={formsData[name]}
                  onChange={(data) => handleFormChange(name, data)}
                />
              </div>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
}
