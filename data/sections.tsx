import {
  AlbumIcon,
  EducationIcon,
  EventsIcon,
  FinanceIcon,
  HeartIcon,
  PeopleIcon,
} from "@/components/icons";
import { Section } from "@/types";

export const SECTION_LIST: Section[] = [
  {
    key: "health",
    label: "Health Information",
    icon: <HeartIcon />,
    desc: "Resources, experts, and health info.",
  },
  {
    key: "finances",
    label: "Financial Information",
    icon: <FinanceIcon />,
    desc: "Bill help, fundraising, donations.",
  },
  {
    key: "education",
    label: "Scholarship Information",
    icon: <EducationIcon />,
    desc: "Scholarships and learning.",
  },
  {
    key: "events",
    label: "Upcoming Events",
    icon: <EventsIcon />,
    desc: "Upcoming and past events.",
  },
  {
    key: "about",
    label: "Corbin United Inc. Officers",
    icon: <PeopleIcon />,
    desc: "About us, leadership, mission.",
  },
  {
    key: "family-album",
    label: "Family Album",
    icon: <AlbumIcon />,
    desc: "Memories in picture form.",
  },
];
