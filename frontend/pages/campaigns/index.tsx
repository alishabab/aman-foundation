import Link from "next/link";
import { Button } from "components";
import { Heading } from "components/heading";

const Campaigns = () => {
  return (
    <div className="px-2 py-4">
      {[1, 2, 3, 4].map((el) => (
        <div key={el} className="mb-8">
          <Link passHref href="/campaigns/slug">
            <a>
              <div className="shadow-md rounded-md">
                <div className="bg-[url('/assets/images/media_1.jpg')] h-[30vh] bg-cover rounded-md"></div>
                <div className="py-2 px-4">
                  <Heading> Lorem, ipsum dolor.</Heading>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Facilis ipsam quisquam laborum, nesciunt quod eius.
                  </p>
                  <Button
                    rounded
                    onClick={(e) => e.preventDefault()}
                    className="mt-2">
                    Support
                  </Button>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
