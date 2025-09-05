"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card3D } from "./Card3D";
import { GalleryItem, GALLERY } from "@/app/constants/gallery";

const FRANCHISES = ["Todos"];

interface GalleryProps {
  onItemClick: (item: GalleryItem) => void;
}

export function Gallery({ onItemClick }: GalleryProps) {
  const [query, setQuery] = useState("");
  const [franchise, setFranchise] = useState("Todos");
  const [sort, setSort] = useState<"recent" | "popular">("recent");

  const filtered = useMemo(() => {
    let res = [...GALLERY];
    if (franchise !== "Todos") {
      res = res.filter((g) => g.franchise === franchise);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.character.toLowerCase().includes(q) ||
          g.tags.join(" ").toLowerCase().includes(q)
      );
    }
    if (sort === "recent") {
      res.sort((a, b) => b.year - a.year);
    } else {
      res.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return res;
  }, [query, franchise, sort]);

  return (
    <>
      {/* CONTROLES */}
      <section className="max-w-6xl mx-auto px-4">
        <Card>
          <CardContent className="py-4 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="size-5 opacity-80" />
              <Tabs value={franchise} onValueChange={(v) => setFranchise(v)}>
                <TabsList className="flex-wrap">
                  {FRANCHISES.map((f) => (
                    <TabsTrigger
                      key={f}
                      value={f}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {f}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 opacity-70" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar personaje, Tag..."
                  className="pl-8 w-64"
                />
              </div>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as "recent" | "popular")
                }
                className="h-9 rounded-md border bg-background px-3 text-sm"
                aria-label="Ordenar"
              >
                <option value="recent">Mas recientes</option>
                <option value="popular">Mas populares</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* GALERIA */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="font-poppins grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 12, rotateX: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card3D intensity={10}>
                  <Card
                    className="overflow-hidden group cursor-pointer h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm"
                    onClick={() => onItemClick(item)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="size-full object-cover transition-all duration-500 group-hover:scale-110"
                      />

                      {/* Overlay gradiente melhorado */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                      {/* Overlay de brilho no hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                      {/* Informações do personagem */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        <div className="space-y-1">
                          <p className="text-white/90 text-sm font-poppins-medium">
                            {item.character}
                          </p>
                          <p className="text-white font-bangers text-lg leading-tight">
                            {item.title}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="backdrop-blur-md bg-white/90 text-black font-poppins-semibold shadow-lg"
                        >
                          {item.year}
                        </Badge>
                      </div>

                      {/* Indicador de likes */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-black/50 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1">
                          <span className="text-red-400 text-sm">❤</span>
                          <span className="text-white text-sm font-poppins-medium">
                            {item.likes?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tags melhoradas */}
                    <CardContent className="p-4 bg-card/80 backdrop-blur-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.tags.slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="font-poppins text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                          >
                            {t}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="font-poppins text-xs"
                          >
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            No se encontraron resultados. Intente con otros filtros o términos.
          </div>
        )}
      </section>
    </>
  );
}
