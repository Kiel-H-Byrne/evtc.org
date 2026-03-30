
import { Section } from "@/types";
import { BiAlbum } from "react-icons/bi";
import { CiDollar, CiHeart } from "react-icons/ci";
import { IoSchool, IoTicket } from "react-icons/io5";
import { TiTicket } from "react-icons/ti";

export const SECTION_LIST: Section[] = [
  {
    key: "health",
    label: "Health Information",
    icon: <CiHeart />,
    desc: "Resources, experts, and health info.",
  },
  {
    key: "finances",
    label: "Financial Information",
    icon: <CiDollar />,
    desc: "Bill help, fundraising, donations.",
  },
  {
    key: "education",
    label: "Scholarship Information",
    icon: <IoSchool />,
    desc: "Scholarships and learning.",
  },
  {
    key: "events",
    label: "Upcoming Events",
    icon: <IoTicket />,
    desc: "Upcoming and past events.",
  },
  {
    key: "about",
    label: "Corbin United Inc. Officers",
    icon: <TiTicket />,
    desc: "About us, leadership, mission.",
  },
  {
    key: "family-album",
    label: "Family Album",
    icon: <BiAlbum />,
    desc: "Memories in picture form.",
  },
];
