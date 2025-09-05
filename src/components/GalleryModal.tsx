"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GalleryItem } from "@/app/constants/gallery";

interface GalleryModalProps {
  active: GalleryItem | null;
  onClose: () => void;
}

export function GalleryModal({ active, onClose }: GalleryModalProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`img-${active.id}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-background rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem com altura responsiva */}
            <div className="relative flex-1 min-h-0">
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-full object-contain bg-muted/20"
                style={{ maxHeight: "70vh" }}
              />

              {/* Botão de fechar melhorado */}
              <Button
                variant="secondary"
                size="sm"
                className="cursor-pointer absolute top-4 right-4 bg-background/90 backdrop-blur-md hover:bg-background border shadow-lg font-poppins"
                onClick={onClose}
              >
                ✕
              </Button>

              {/* Indicador de likes no modal */}
              <div className="absolute top-4 left-4">
                <div className="bg-background/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 shadow-lg">
                  <span className="text-red-500 text-lg">❤</span>
                  <span className="text-foreground font-poppins-semibold">
                    {active.likes?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Informações melhoradas */}
            <div className="p-6 bg-card/50 backdrop-blur-sm border-t">
              <div className="space-y-4">
                {/* Título principal */}
                <div>
                  <h3 className="text-2xl font-bangers text-foreground mb-2">
                    {active.title}
                  </h3>
                  <p className="text-muted-foreground font-poppins">
                    Personaje:{" "}
                    <span className="text-foreground font-medium">
                      {active.character}
                    </span>{" "}
                    • {active.year}
                  </p>
                </div>

                {/* Badges melhorados */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="font-poppins-semibold">
                    {active.franchise}
                  </Badge>
                  {active.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="font-poppins border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
