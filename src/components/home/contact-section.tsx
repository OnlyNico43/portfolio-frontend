'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useState, type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation('home');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('home:contact.title')}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t('home:contact.subtitle')}</p>
          </div>

          {/* Contact Form & Social Links */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={e => void handleSubmit(e)} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('home:contact.form.name')}</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('home:contact.form.email')}</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('home:contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('home:contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                  <CardDescription>Find me on social media</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t('home:contact.social.github')}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      {t('home:contact.social.linkedin')}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" />
                      {t('home:contact.social.twitter')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Prefer email? Drop me a line</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="mailto:hello@example.com">
                      <Mail className="mr-2 h-4 w-4" />
                      hello@example.com
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
