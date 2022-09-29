import Image from "next/image";
import { useSession } from "next-auth/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback, useRef } from "react";
import { dehydrate, QueryClient } from "react-query";
import {
  getCampaigns,
  getImpactStory,
  getOrganization,
  useGetCampaignsQuery,
  useGetImpactStoryQuery,
  useGetOrganizationQuery,
  useGetQODQuery,
} from "services/queries";
import { CacheKeys } from "services/cacheKeys";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faBookOpen,
  faHandHoldingHeart,
  faSunPlantWilt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, EditAchievements } from "components";
import { AchievementCard } from "components/achievementCard";
import { Heading } from "components/heading";

export default function Hero() {
  const { data: campaigns } = useGetCampaignsQuery();
  const { data: qod } = useGetQODQuery();
  const { data: impactStory } = useGetImpactStoryQuery();
  const { data: organization } = useGetOrganizationQuery();

  const session = useSession();

  const [isEditAchievements, setIsEditAchievements] = useState(false);

  const highlitedCampaigns = campaigns?.filter(
    (campaign) => campaign.isHighlighted
  );
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  // emblaRef will be a reference to our carousel viewport
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: "start",
      // aligns the first slide to the start
      // of the viewport else will align it to the middle.

      loop: true,
      // we need the carousel to loop to the
      // first slide once it reaches the last slide.

      skipSnaps: false,
      // Allow the carousel to skip scroll snaps if
      // it's dragged vigorously.

      inViewThreshold: 0.7,
      // percentage of a slide that need's to be visible
      // inorder to be considered in view, 0.7 is 70%.
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // this function allow's us to scroll to the slide whose
  // id correspond's to the id of the navigation dot when we
  // click on it.

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  // set the id of the current slide to active id
  // we need it to correctly highlight it's corresponding
  // navigation dot.

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    autoplay.current.reset();
  }, [embla, setSelectedIndex]);

  // make sure embla is mounted and return true operation's
  // can be only performed on it if it's successfully mounted.

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const achievementsIcons = [
    faBowlRice,
    faBookOpen,
    faHandHoldingHeart,
    faSunPlantWilt,
  ];

  return (
    <>
      <Modal
        isOpen={isEditAchievements}
        onClick={() => {
          setIsEditAchievements(false);
        }}>
        <EditAchievements
          achievements={organization?.acheivements}
          cover={organization?.cover}
          cb={() => {
            setIsEditAchievements(false);
          }}
        />
      </Modal>
      <section className="relative">
        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Carousel container */}
          <div className="flex">
            {/* Carousel slides */}
            {highlitedCampaigns?.map((campaign) => {
              return (
                <div
                  className="relative w-full h-[33vh] flex-none overflow-hidden cursor-pointer"
                  key={campaign.title}>
                  <Link href={`/campaigns/${campaign.slug}`}>
                    <a>
                      <div
                        className="w-full h-full bg-cover"
                        style={{
                          backgroundImage: `url(${campaign.image.url})`,
                        }}
                      />
                    </a>
                  </Link>
                  <div className="bg-gray-900/70 rounded-md absolute top-[5%] left-[5%] text-primary-600 font-semibold text-xl py-0.5 px-2">
                    {campaign.title}
                  </div>
                  <Button
                    rounded
                    className="w-auto absolute bottom-[15%] right-[10%]">
                    Support
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute left-1/2 bottom-2 flex space-x-2">
          {scrollSnaps.map((_, idx) => (
            <button
              className={`w-2 h-2 rounded-full ${
                idx === selectedIndex ? "bg-primary-500" : "bg-gray-300"
              }`}
              key={idx}
              onClick={() => scrollTo(idx)}
            />
          ))}
        </div>
      </section>

      {qod?.quote && (
        <section className="mt-8 px-4 flex flex-col space-y-2">
          <h1 className="text-center text-gray-600 font-semibold">
            Quote of the Day
          </h1>
          <h2 className="text-center text-2xl font-bold italic text-gray-600">
            <q cite={qod.permalink}>{qod?.quote}</q>
          </h2>
          <span className="ml-auto text-gray-600">~ {qod?.author}</span>
        </section>
      )}

      {impactStory && (
        <section className="mt-8 px-2">
          <div className="flex flex-col">
            <Heading className="mb-2">IMPACT STORY</Heading>
            <Image
              src={impactStory.image.url}
              width="100%"
              height="50%"
              layout="responsive"
              objectFit="fill"
              alt={impactStory.title}
              blurDataURL={impactStory.image.url}
            />
            <h2 className="text-xl text-primary-600 font-bold">
              {impactStory.title}
            </h2>
            <p className="text-gray-600">
              {impactStory.description.substring(0, 100)}...
            </p>
            <Link href={`/stories/${impactStory.slug}`} passHref>
              <a className="mt-2">
                <Button className="w-auto">READ MORE</Button>
              </a>
            </Link>
          </div>
        </section>
      )}
      <section
        className={`mt-8 bg-secondary-500 bg-cover bg-center bg-blend-screen h-auto relative`}
        style={{
          backgroundImage: `url(${
            organization?.cover?.url
              ? organization?.cover?.url
              : "/assets/images/media_1.jpg"
          })`,
        }}>
        {session?.data?.isAdmin && (
          <button
            className="absolute right-8 -top-8 text-secondary-600"
            onClick={(e) => {
              e.preventDefault();
              setIsEditAchievements(true);
            }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        <div className="flex flex-wrap justify-center items-center py-8">
          {organization?.acheivements?.map((achievement, idx) => (
            <AchievementCard
              key={achievement.title}
              icon={achievementsIcons[idx]}
              title={achievement.title}
              description={achievement.description}
              className="m-4"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(CacheKeys.Campaigns, getCampaigns);
  await queryClient.prefetchQuery(CacheKeys.Organization, getOrganization);
  await queryClient.prefetchQuery(
    [CacheKeys.Stories, "impact"],
    getImpactStory
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
