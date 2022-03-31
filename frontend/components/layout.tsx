import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { NextPage } from "next";

export const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Aman Foundation</title>
        <meta name="description" content="Aman Foundation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
};
