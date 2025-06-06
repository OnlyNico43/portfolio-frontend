'use server';
import type { FunctionComponent, ReactElement } from 'react';

const ContactPage: FunctionComponent = async (): Promise<ReactElement> => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-4xl font-bold">Get in Touch</h1>
      <p className="mt-4 text-lg text-muted-foreground">Full contact page coming soon...</p>
    </div>
  );
};

export default ContactPage;
