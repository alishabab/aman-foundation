import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Button } from "components";

export default function Hero() {
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

  const posts = [
    {
      title: "First post",
      slug: "first-post",
      image_cover: "/assets/images/media_1.jpg",
      tags: "gekmd, jdkd ,kddk",
      publishedAt: "10 Jun, 2021",
      summary:
        "lore ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia!",
      author: "Shabab",
      designation: "CEO",
    },
    {
      title: "second post",
      slug: "first-post",
      image_cover: "/assets/images/media_2.jpg",
      tags: "gekmd, jdkd ,kddk",
      publishedAt: "10 Jun, 2021",
      summary:
        "lore ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia!",
      author: "Shabab",
      designation: "CEO",
    },
    {
      title: "third post",
      slug: "first-post",
      image_cover: "/assets/images/media_3.jpg",
      tags: "gekmd, jdkd ,kddk",
      publishedAt: "10 Jun, 2021",
      summary:
        "lore ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia!",
      author: "Shabab",
      designation: "CEO",
    },
  ];

  return (
    <>
      <section className="relative">
        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Carousel container */}
          <div className="flex">
            {/* Carousel slides */}
            {posts.map((post) => {
              const src = post.image_cover;
              return (
                <div
                  className="relative w-full flex-none overflow-hidden cursor-pointer"
                  key={post.title}>
                  <Link href={`/campaigns/${post.slug}`}>
                    <a>
                      <Image
                        loader={() => src}
                        src={src}
                        width="100%"
                        height="40%"
                        layout="responsive"
                        objectFit="fill"
                        alt="cover image"
                        placeholder="blur"
                        blurDataURL={post.image_cover}
                      />
                    </a>
                  </Link>
                  <div className="bg-gray-900/70 rounded-md absolute top-[5%] left-[5%] text-primary-600 font-semibold text-xl py-0.5 px-2">
                    Campaign Name
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
      <section className="my-8 px-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-secondary-600 mb-2">
            IMPACT STORY
          </h1>
          <Image
            src="/assets/images/media_1.jpg"
            width="100%"
            height="40%"
            layout="responsive"
            objectFit="fill"
            alt="story"
            blurDataURL="/assets/images/media_1.jpg"
          />
          <h2 className="text-xl text-primary-600 font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi.
          </p>
          <Link href="/stories/first-post" passHref>
            <a className="mt-2">
              <Button className="w-auto">READ MORE</Button>
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
