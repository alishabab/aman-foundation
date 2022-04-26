import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { getCampaign, useGetCampaignQuery } from "services/queries";
import { ShareBar } from "components";
import { CacheKeys } from "services/cacheKeys";
import Image from "next/image";

const Campaign = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: campaign } = useGetCampaignQuery({ slug: slug as string });
  console.log({ campaign });
  return (
    <>
      <div className="px-2 py-4">
        {campaign && (
          <>
            <h2 className="font-extrabold text-3xl text-gray-600 mb-4">
              {campaign?.title}
            </h2>
            <Image
              src={campaign.image.url}
              width="100%"
              height="60%"
              layout="responsive"
              placeholder="blur"
              alt={campaign.title}
              blurDataURL={campaign.image.url}
            />
            <p className="mt-4 whitespace-pre-wrap text-gray-900 text-md">
              {campaign.description}
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

  await queryClient.prefetchQuery([CacheKeys.Campaign, slug], () =>
    getCampaign(slug)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Campaign;
