import { Suspense } from "react";
import { api } from "~/trpc/server";
import { ExampleSsr } from "./_components/example-ssr";
import { ExampleClient } from "./_components/example-client";


export const runtime = "edge";

export default function HomePage() {
  void api.post.all.prefetch()

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>

        <ExampleClient />

        <Suspense fallback={<h1>Simulating 3 second SSR loading</h1>}>
          <ExampleSsr />
        </Suspense>
      </div>
    </main>
  );
}
