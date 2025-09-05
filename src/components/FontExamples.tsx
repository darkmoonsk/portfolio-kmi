"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FontExamples() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bangers text-center mb-8">
        Guia de Fontes do Portfolio
      </h1>

      {/* Bangers */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bangers text-2xl">Bangers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bangers text-xl">
              Títulos e Elementos de Destaque
            </h3>
            <p className="text-sm text-muted-foreground">
              Fonte display divertida e chamativa, perfeita para títulos e
              botões.
            </p>
            <div className="space-y-2">
              <p className="font-bangers text-3xl">KMI Portfolio</p>
              <p className="font-bangers text-xl">Ver Portfolio</p>
              <p className="font-bangers text-lg">Contrate-me</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Poppins */}
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins text-2xl">Poppins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-poppins text-xl">Textos e Conteúdo</h3>
            <p className="text-sm text-muted-foreground">
              Fonte sans-serif moderna e elegante, ideal para textos corridos e
              descrições.
            </p>
            <div className="space-y-2">
              <p className="font-poppins-light text-lg">Poppins Light (300)</p>
              <p className="font-poppins-regular text-lg">
                Poppins Regular (400)
              </p>
              <p className="font-poppins-medium text-lg">
                Poppins Medium (500)
              </p>
              <p className="font-poppins-semibold text-lg">
                Poppins Semibold (600)
              </p>
              <p className="font-poppins-bold text-lg">Poppins Bold (700)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Japan Daisuki */}
      <Card>
        <CardHeader>
          <CardTitle className="font-japan-daisuki text-2xl">
            Japan Daisuki
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-japan-daisuki text-xl">Elementos Temáticos</h3>
            <p className="text-sm text-muted-foreground">
              Fonte japonesa para elementos temáticos e especiais.
            </p>
            <div className="space-y-2">
              <p className="font-japan-daisuki text-lg">
                Cosplayer & Digital Artist
              </p>
              <p className="font-japan-daisuki text-base">Anime & Manga</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemplos de Uso */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bangers text-2xl">
            Exemplos de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-poppins-semibold text-lg mb-2">
                Títulos Principais:
              </h4>
              <code className="bg-muted p-2 rounded text-sm block">
                {`<h1 className="font-bangers text-4xl">KMI</h1>`}
              </code>
            </div>

            <div>
              <h4 className="font-poppins-semibold text-lg mb-2">
                Textos Corridos:
              </h4>
              <code className="bg-muted p-2 rounded text-sm block">
                {`<p className="font-poppins">Descrição do projeto...</p>`}
              </code>
            </div>

            <div>
              <h4 className="font-poppins-semibold text-lg mb-2">
                Elementos Temáticos:
              </h4>
              <code className="bg-muted p-2 rounded text-sm block">
                {`<span className="font-japan-daisuki">Cosplayer</span>`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
