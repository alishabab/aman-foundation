import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { getStory, useGetStoryQuery } from "services/queries";
import { ShareBar } from "components";
import { CacheKeys } from "services/cacheKeys";
import Image from "next/image";

const Story = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: story } = useGetStoryQuery({ slug: slug as string });

  return (
    <>
      <Head>
        <title>Aman Foundation India - Story - {story?.title}</title>
        <meta
          property="og:title"
          content={`Aman Foundation India - Story - ${story?.title}`}
          key="title"
        />
        <meta property="og:description" content={story?.description} />
        <meta property="og:image" content={story?.image.url} />
      </Head>
      <div className="p-2">
        {story && (
          <>
            <h2 className="font-extrabold text-3xl text-primary-600 mb-2">
              {story?.title}
            </h2>

            <Image
              src={story.image.url}
              width="100%"
              height="100%"
              layout="responsive"
              placeholder="blur"
              alt={story.title}
              blurDataURL={story.image.url}
            />

            <p className="mt-4 whitespace-pre-wrap text-gray-900 text-md">
              {story.description}
            </p>
          </>
        )}
      </div>
      <ShareBar className="sticky bottom-0" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx?.params?.slug as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([CacheKeys.Stories, slug], () =>
    getStory(slug)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Story;
