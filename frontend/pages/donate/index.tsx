import Image from "next/image";

const Donate = () => {
  return (
    <div className="px-2">
      <h2 className="text-center text-2xl font-bold italic text-gray-600">
        <q cite="https://www.abuaminaelias.com/dailyhadithonline/2010/09/20/charity-forgiveness-wealth/">
          Charity does not decrease wealth.
        </q>
      </h2>
      <p className="text-right text-gray-600">~ Prophet Muhammad</p>
      <div className="w-full h-full relative">
        <Image
          src="/assets/images/support.PNG"
          alt="donate"
          layout="responsive"
          width={100}
          height={70}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Donate;
