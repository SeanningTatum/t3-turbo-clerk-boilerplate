import { Suspense } from "react";

import { Button } from "@acme/ui/button";

import { api } from "~/trpc/server";
import { ExampleClient } from "./_components/example-client";
import { ExampleSsr } from "./_components/example-ssr";

export const runtime = "edge";

export default function HomePage() {
  void api.post.all.prefetch();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>

        <Button>Sup</Button>

        <ExampleClient />

        <Suspense fallback={<h1>Simulating 3 second SSR loading</h1>}>
          <ExampleSsr />
        </Suspense>
      </div>
    </main>
  );
}
