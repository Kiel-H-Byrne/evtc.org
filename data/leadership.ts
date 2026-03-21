import { Leader, Professional } from "@/types";

export const LEADERSHIP: Leader[] = [
  {
    name: "Carl Williams",
    role: "President",
    img: "https://firebasestorage.googleapis.com/v0/b/ai-slideshow.firebasestorage.app/o/assets%2Fclients%2Fcorbin-united-inc%2Fofficers%2Fcorbin-united-officer-carl-williams.jpg?alt=media",
    phone: "301-267-2173",
    email: "president@corbinunitedinc.org",
  },
  {
    name: "Kenya Corbin-Prince",
    role: "Vice President",
    img: "",
    phone: "267-230-7616",
    email: "vicepresident@corbinunitedinc.org",
  },
  {
    name: "Marquita Corbin-Lane",
    role: "Treasurer",
    img: "",
    phone: "215-667-1741",
    email: "treasurer@corbinunitedinc.org",
  },
  {
    name: "Portia Conix",
    role: "Secretary",
    img: "https://firebasestorage.googleapis.com/v0/b/ai-slideshow.firebasestorage.app/o/assets%2Fclients%2Fcorbin-united-inc%2Fofficers%2Fcorbin-united-officer-portia-conix.jpg?alt=media",
    phone: "215-264-2004",
    email: "secretary@corbinunitedinc.org",
  },
];

export const PROFESSIONALS: Record<string, Professional> = {
  health: {
    name: "Carl Williams",
    email: "president@corbinunitedinc.org",
    img: "https://firebasestorage.googleapis.com/v0/b/ai-slideshow.firebasestorage.app/o/assets%2Fclients%2Fcorbin-united-inc%2Fofficers%2Fcorbin-united-officer-carl-williams.jpg?alt=media",
    title: "Community Health Expert",
  },
  education: {
    name: "Prof. Kat Johnson",
    email: "katherine@corbinunited.org",
    img: "https://randomuser.me/api/portraits/women/49.jpg",
    title: "Education Specialist",
  },
  finances: {
    name: "Mr. Benjamin Graham",
    email: "benjamin@corbinunited.org",
    img: "https://randomuser.me/api/portraits/men/50.jpg",
    title: "Financial Advisor",
  },
};
