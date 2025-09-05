"use client";

import React from "react";
import { Wand2, CalendarDays, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function About() {
  return (
    <section className="font-poppins max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="size-5" /> Habilidades
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p className="font-poppins">
            Costura avanzada, modelado EVA, pintura de accesorios, fotografía
            creativa y edición de video básica.
          </p>
          <Separator />
          <ul className="grid grid-cols-2 gap-2 text-foreground">
            <li>• Armor crafting</li>
            <li>• Wig styling</li>
            <li>• Props 3D</li>
            <li>• Stage performance</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" /> Próximos eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          {/* <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Comic Con 2025</p>
            </div>
            <Badge variant="outline">Jul 2024</Badge>
          </div> */}
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">SOFA 2025</p>
              <p className="text-xs">Bogota, CO</p>
            </div>
            <Badge variant="outline">OCT 2025</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="size-5" /> Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500" />
            <span>Mejor Cosplay - Anime Friends 2023</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500" />
            <span>Top 10 - SOFA Cosplay Contest</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-500" />
            <span>Colaboración con Riot Games</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
