import Hero from "@/components/hero";
import Posts from "@/components/Posts";
import { FetchPosts } from "@/lib/actions/postAction";

export default async function Home() {
  const posts = await FetchPosts()
  return (
    <main>
        <Hero/>
        <Posts posts={posts}/>
    </main>
  );
}
