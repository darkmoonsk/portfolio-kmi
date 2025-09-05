// \n// Cosplay Portfolio — Single-file React component\n// - TailwindCSS + shadcn/ui + framer-motion\n// - Galeria com filtros, busca e lightbox\n// - Seções: Hero, Sobre, Destaques, Galeria, Eventos, Contato\n// - Modo claro/escuro por container\n//\n
// Tipos de dados
export interface GalleryItem {
  id: string;
  title: string;
  character: string;
  franchise: string;
  year: number;
  src: string;
  tags: string[];
  likes?: number;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "1",
    title: "Vi",
    character: "Vi",
    franchise: "League of Legends",
    year: 2025,
    src: "/fotos/cosplays/vi-1.jpg",
    tags: [],
    likes: 826,
  },
  {
    id: "2",
    title: "Vi",
    character: "Vi",
    franchise: "League of Legends",
    year: 2025,
    src: "/fotos/cosplays/vi-2.jpg",
    tags: [],
    likes: 612,
  },
  {
    id: "3",
    title: "Vi",
    character: "Vi",
    franchise: "League of Legends",
    year: 2025,
    src: "/fotos/cosplays/vi-3.jpg",
    tags: [],
    likes: 934,
  },
  {
    id: "4",
    title: "",
    character: "",
    franchise: "",
    year: 2025,
    src: "/fotos/cosplays/cosplay-4.jpg",
    tags: [],
    likes: 478,
  },
  {
    id: "5",
    title: "",
    character: "",
    franchise: "",
    year: 2024,
    src: "/fotos/cosplays/cosplay-5.jpg",
    tags: [],
    likes: 1051,
  },
  {
    id: "6",
    title: "",
    character: "",
    franchise: "",
    year: 2024,
    src: "/fotos/cosplays/cosplay-6.jpg",
    tags: [],
    likes: 742,
  },
];
