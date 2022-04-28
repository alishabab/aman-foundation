import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getCampaign, useGetCampaignQuery } from "services/queries";
import { ShareBar } from "components";
import { CacheKeys } from "services/cacheKeys";
import Image from "next/image";

const Campaign = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: campaign } = useGetCampaignQuery({ slug: slug as string });

  return (
    <>
      <Head>
        <title>Aman Foundation India - Campaign - {campaign?.title}</title>
        <meta
          property="og:title"
          content={`Aman Foundation India - Campaign - ${campaign?.title}`}
          key="title"
        />
        <meta property="og:description" content={campaign?.description} />
        <meta property="og:image" content={campaign?.image.url} />
      </Head>
      <div className="px-2">
        {campaign && (
          <>
            <h2 className="font-extrabold text-3xl text-secondary-600 mb-2">
              {campaign?.title}
            </h2>
            <div className="mb-2 flex justify-between items-center">
              {!campaign.isUpComing && (
                <h4 className="text-secondary-600 font-bold text-lg">
                  Beneficiaries so far:{" "}
                  <i>
                    <b>
                      <span className="text-primary-600">
                        {campaign.noOfBenificiaries}
                      </span>
                    </b>
                  </i>
                </h4>
              )}
              <span
                className={`flex ml-auto items-center ${
                  campaign.isCompleted
                    ? "bg-secondary-600"
                    : campaign.isUpComing
                    ? "bg-gray-600"
                    : "bg-primary-600"
                } px-4 py-1 rounded-full text-white font-bold`}>
                <FontAwesomeIcon icon={faCircle} className="text-[6px] mr-2" />
                {campaign.isCompleted
                  ? "COMPLETED"
                  : campaign.isUpComing
                  ? "UPCOMING"
                  : "ON GOING"}
              </span>
            </div>
            <Image
              src={campaign.image.url}
              width="100%"
              height="100%"
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
