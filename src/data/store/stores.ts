import Store1 from "../../assets/images/store/store-1.png"
import Store2 from "../../assets/images/store/store-2.png"
import Store3 from "../../assets/images/store/store-3.png"
import Store4 from "../../assets/images/store/store-4.png"
import Store5 from "../../assets/images/store/store-5.png"
import Store6 from "../../assets/images/store/store-6.png"
import Store7 from "../../assets/images/store/store-7.png"
import type { StoreData } from "../../types/store"

export const storeData: StoreData[] = [
  {
    id: 1,
    name: "TechHub Central",
    image: Store1,
    description: "Premier electronics and gadgets store with the latest tech innovations.",
    link: "https://example.com/techhub",
    category: "Electronics",
    tags: ["tech", "gadgets", "innovation"],
  },
  {
    id: 2,
    name: "Gamer's Paradise",
    image: Store2,
    description: "The ultimate destination for gaming enthusiasts and professional players.",
    link: "https://example.com/gamersparadise",
    category: "Gaming",
    tags: ["games", "esports", "accessories"],
  },
  {
    id: 3,
    name: "Digital Dreams",
    image: Store3,
    description: "Cutting-edge digital products and smart home solutions.",
    link: "https://example.com/digitaldreams",
    category: "Smart Home",
    tags: ["smart", "automation", "digital"],
  },
  {
    id: 4,
    name: "Gadget Galaxy",
    image: Store4,
    description: "Explore a universe of innovative gadgets and tech accessories.",
    link: "https://example.com/gadgetgalaxy",
    category: "Electronics",
    tags: ["gadgets", "accessories", "tech"],
  },
  {
    id: 5,
    name: "Circuit City",
    image: Store5,
    description: "Specialized in computer hardware, components, and custom builds.",
    link: "https://example.com/circuitcity",
    category: "Computers",
    tags: ["hardware", "components", "custom"],
  },
  {
    id: 6,
    name: "Smart Solutions",
    image: Store6,
    description: "Your one-stop shop for smart home automation and IoT devices.",
    link: "https://example.com/smartsolutions",
    category: "Smart Home",
    tags: ["smart", "IoT", "automation"],
  },
  {
    id: 7,
    name: "Tech Emporium",
    image: Store7,
    description: "Luxury tech products and high-end computing solutions.",
    link: "https://example.com/techemporium",
    category: "Luxury",
    tags: ["luxury", "premium", "high-end"],
  },
]

export const storeCategories = ["All", "Electronics", "Gaming", "Smart Home", "Computers", "Luxury"]
