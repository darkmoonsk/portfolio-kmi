"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserRound, MapPin, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card3D } from "./Card3D";
import { FloatingElements3D } from "./FloatingElements3D";
import { Text3D } from "./Text3D";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Text3D delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bangers font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                KMI
              </h1>
            </Text3D>
            <Text3D delay={0.4}>
              <p className="font-japan-daisuki text-2xl text-muted-foreground">
                Cosplayer, Creadora de Contenido & Streamer
              </p>
            </Text3D>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <UserRound className="size-4" />
              <span>Cosplay</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>Colombia</span>
            </div>
            <div className="flex items-center gap-1">
              <Wand2 className="size-4" />
              <span>Digital Art</span>
            </div>
          </div>

          <p className="font-poppins text-muted-foreground leading-relaxed">
            &quot;En este mundo, nada hay tan cruel como la desolación de no
            desear nada&quot; - Haruki Murakami
          </p>

          {/* <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              <Sparkles className="mr-1 size-3" />
              League of Legends
            </Badge>
            <Badge variant="secondary">Final Fantasy VII</Badge>
            <Badge variant="secondary">Evangelion</Badge>
            <Badge variant="secondary">Chainsaw Man</Badge>
          </div> */}

          <div className="flex gap-3">
            <Button
              size="lg"
              className="cursor-pointer font-bangers font-medium"
            >
              Ver Portafolio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer font-bangers"
            >
              Contacto
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Card3D className="h-full" intensity={20}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
              <Image
                src="/fotos/kmi.jpg"
                alt="KMI Cosplay"
                width={400}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
              {/* Overlay com gradiente 3D */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </Card3D>

          {/* Floating elements 3D */}
          <FloatingElements3D />

          {/* Elementos flutuantes originais com efeitos 3D */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Sparkles className="size-6" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotateX: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground p-3 rounded-full shadow-lg backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Wand2 className="size-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
