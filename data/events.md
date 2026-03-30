import { Event, HeroCarouselItem, PastEvent } from "@/types";
import { SiCashapp, SiZelle } from "react-icons/si";

export const UPCOMING_EVENTS: Event[] = [
  {
    title: "New Year's Cabaret",
    date: "2025-12-31T19:00:00",
    location: "123 Main St, Anytown, USA",
    time: "7:00 PM",
    desc: "Ring in the New Year with style, soul, and unforgettable vibes at the 2025 New Year's Eve Cabaret! Join us for a night of celebration, community, music, and elegance as we count down to midnight together.",
    img: "https://firebasestorage.googleapis.com/v0/b/ai-slideshow.firebasestorage.app/o/assets%2Fclients%2Fcorbin-united-inc%2Fevents%2Fevent-flyer-2025-new-year-cabaret-corbin-united-inc.png?alt=media",
    thumbnailUrl:
      "https://firebasestorage.googleapis.com/v0/b/ai-slideshow.firebasestorage.app/o/assets%2Fclients%2Fcorbin-united-inc%2Fevents%2Fevent-flyer-2025-new-year-cabaret-corbin-united-inc.png?alt=media",
    descLists: [
      {
        title: "What to Expect",
        items: [
          "Live entertainment & cabaret-style performances",
          "A stylish, high-energy crowd",
          "A powerful New Year's countdown experience",
          "A warm, welcoming atmosphere filled with connection and celebration",
        ],
      },
      {
        title: "BYOB",
        items: [
          "Light food, champagne toast & good vibes provided",
          "Bring your own to keep your party going.",
        ],
      },
    ],
    payment: {
      amount: { amount: "40", per: "person" },
      options: [
        {
          service: "CashApp",
          username: "$CorbinUnited",
          url: "https://cash.app/$CorbinUnited",
          icon: <SiCashapp />
        },
        {
          service: "Zelle",
          username: "corbinunited2025@gmail.com",
          icon: <SiZelle />,
        },
      ],
      note: "More at the door — secure your spot early!",
    },
    closingWords:
      "This is more than a party — it's a New Year's experience. Dress to impress, bring your friends, and step into 2025 surrounded by great people, great energy, and unforgettable moments.",
  },
  {
    title: "Scholarship Awards Night",
    date: "2024-09-10T18:00:00",
    location: "456 Oak Ave, Anytown, USA",
    time: "6:00 PM",
    desc: "Honoring our scholarship recipients.",
    img: "https://images.unsplash.com/photo-15151688339_06-d2a3b82b1e4b?auto=format&fit=crop&w=400&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-15151688339_06-d2a3b82b1e4b?auto=format&fit=crop&w=400&q=80",
  },
];

export const PAST_EVENTS: PastEvent[] = [
  {
    title: "Basket of Cheer Raffle 2025",
    img: "/events/BOCRaffle_2025.JPEG",
  },
  // {
  //   title: "Community Picnic",
  //   img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  // },
];

export const HERO_CAROUSEL: HeroCarouselItem[] = [
  {
    title: "Message from our Matriarch Loretta Early",
    textContent: {
      greeting: "Dear Family",
      message:
        "Thank you all for honoring me as the Matriarch of this Beautiful Family...",
      closing:
        "...and thank you for giving me my flowers while I can see and smell them. God Bless all of you.",
      signature: { text: "God Bless", name: "Loretta Early" },
    },
    type: "video",
    aspect: "9:16",
    url: "/video/LorettaEarly.mp4",
  },
  {
    title: "Basket of Cheer Raffle 2025",
    textContent: {
      message:
        "Drawings will be held hourly at the 2025 New Year's Eve Cabaret",
      signature: { name: "" },
    },
    type: "image",
    aspect: "9:16",
    url: "/events/BOCRaffle_2025.JPEG",
  },
  {
    title: "New Years Cabaret",
    textContent: {
      message:
        "Ring in the New Year with style, soul, and unforgettable vibes at the 2025 New Year's Eve Cabaret! Join us for a night of celebration, community, music, and elegance as we count down to midnight together.",
      signature: {
        name: "This is more than a party — it's a New Year's experience. Dress to impress, bring your friends, and step into 2025 surrounded by great people, great energy, and unforgettable moments.",
      },
    },
    type: "image",
    aspect: "9:16",
    url: "/events/NYCabaret_2025.png",
  },
];
