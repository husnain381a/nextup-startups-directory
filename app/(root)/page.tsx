import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query;

  const p = {search: query || null};

  // const session = await auth();
  // console.log("session", session?.id);

  // fetching startups from sanity
  // const posts = await client.fetch(STARTUPS_QUERY)
  
  //live only fetch - fetching data from sanity cms
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: p,
  });

  // const posts = [{_createdAt: 'Yesterday',
  //   views: 50,
  //   author: {_id: 1, name: 'Husnain Mazhar'},
  //   _id: 1,
  //   description: 'This is a sample description',
  //   image: 'https://placehold.co/600x400/png',
  //   category: 'Tech',
  //   title: 'OpenAI Chat-Gpt',
  // }]
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>
      <SearchForm query={query} />
    </section>
    {/* Section for startup cards */}

    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search Results for "${query}"` : "All Startups"}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: StartupTypeCard, index: number) => (
            <StartupCard key={post?._id} post = {post}/>
        ))
      ):(
        <p className="no-results">No startups found</p>
      )}

      </ul>
    </section>
    <SanityLive/>
    </>
  );
}
