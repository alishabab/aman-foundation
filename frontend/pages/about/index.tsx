import { Heading } from "components/heading";
import Image from "next/image";
const About = () => {
  return (
    <>
      <div className="py-8 px-2">
        <div className="mb-8">
          <Heading className="text-center mb-2">WHO ARE WE?</Heading>
          <Image
            src="/assets/images/media_1.jpg"
            width="100%"
            height="50%"
            layout="responsive"
            objectFit="fill"
            alt="story"
            blurDataURL="/assets/images/media_1.jpg"
          />
          <p className="mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            vel ipsam ducimus aliquam et veniam neque inventore ad quisquam.
            Odio, excepturi quia? Et vero, ullam fuga tempora ea nemo aut
            accusamus quibusdam praesentium repellat dolor dicta ut. Esse,
            officiis cum!
          </p>
        </div>
        <div className="mb-8">
          <Heading className="text-center mb-2">OUR VISION</Heading>
          <Image
            src="/assets/images/media_1.jpg"
            width="100%"
            height="50%"
            layout="responsive"
            objectFit="fill"
            alt="story"
            blurDataURL="/assets/images/media_1.jpg"
          />
          <p className="mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            vel ipsam ducimus aliquam et veniam neque inventore ad quisquam.
            Odio, excepturi quia? Et vero, ullam fuga tempora ea nemo aut
            accusamus quibusdam praesentium repellat dolor dicta ut. Esse,
            officiis cum!
          </p>
        </div>
        <div>
          <Heading className="text-center mb-2">OUR MISSION</Heading>
          <Image
            src="/assets/images/media_1.jpg"
            width="100%"
            height="50%"
            layout="responsive"
            objectFit="fill"
            alt="story"
            blurDataURL="/assets/images/media_1.jpg"
          />
          <p className="mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            vel ipsam ducimus aliquam et veniam neque inventore ad quisquam.
            Odio, excepturi quia? Et vero, ullam fuga tempora ea nemo aut
            accusamus quibusdam praesentium repellat dolor dicta ut. Esse,
            officiis cum!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
