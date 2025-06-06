'use server';
import type { FunctionComponent, ReactElement } from 'react';

const ProjectsPage: FunctionComponent = async (): Promise<ReactElement> => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-4xl font-bold">Projects Portfolio</h1>
      <p className="mt-4 text-lg text-muted-foreground">Full projects gallery coming soon...</p>
    </div>
  );
};

export default ProjectsPage;
