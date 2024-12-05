import { api } from "~/trpc/server"


export async function ExampleSsr() {
  const posts = await api.post.all();

  return JSON.stringify(posts)
}