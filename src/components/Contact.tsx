"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Informações de Contato */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Vamos trabalhar juntos!</h2>
            <p className="font-poppins text-muted-foreground leading-relaxed">
              Interessado em colaborar, participar de eventos ou contratar meus
              serviços? Entre em contato e vamos conversar sobre seu projeto!
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="size-4" /> Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Para propostas comerciais e colaborações
                </p>
                <p className="font-medium">contato@kmi.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="size-4" /> Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Disponibilidade para eventos e convenções
                </p>
                <p className="font-medium">eventos@kmi.com</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Tipos de colaboração:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Participação em eventos e convenções</li>
              <li>• Campanhas de marca e parcerias</li>
              <li>• Workshops e tutoriais de cosplay</li>
              <li>• Fotografia e sessões criativas</li>
              <li>• Comissões de arte digital</li>
            </ul>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="size-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-muted-foreground">
                    Obrigada pelo contato. Responderei em breve!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-1 block"
                      >
                        Nome
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium mb-1 block"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium mb-1 block"
                    >
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tipo de colaboração"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium mb-1 block"
                    >
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-me mais sobre seu projeto..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-4" />
                        Enviar mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
