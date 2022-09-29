import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { NextPage } from "next";
import { Alert } from "./alert";
import { useAlert } from "context/AlertContext";
import { PageNav } from "./pageNav";
export const Layout: NextPage = ({ children }) => {
  const { type } = useAlert();
  return (
    <>
      <Head>
        <title>Aman Foundation India</title>
        <meta
          name="description"
          content="Aman Foundation India is a non-governmental organization (NGO) that runs various projects and campaigns to help the underprivileged in India."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Aman Foundation India" key="title" />
        <meta
          property="og:description"
          content="Aman Foundation India is a non-governmental organization (NGO) that runs various projects and campaigns to help the underprivileged in India."
        />
        <meta property="og:image" content="/assets/images/hands.svg" />
      </Head>
      <Navbar />
      {type !== "none" && (
        <div className="fixed top-20 w-64 left-8 z-30">
          <Alert />
        </div>
      )}
      <main className="mt-16">
        <PageNav className="pl-4 py-4" />
        {children}
      </main>
      <Footer />
    </>
  );
};
