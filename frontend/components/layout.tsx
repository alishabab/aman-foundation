import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { NextPage } from "next";
import { Alert } from "./alert";
import { useAlert } from "context/AlertContext";

export const Layout: NextPage = ({ children }) => {
  const { type } = useAlert();
  return (
    <>
      <Head>
        <title>Aman Foundation</title>
        <meta name="description" content="Aman Foundation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {type !== "none" && (
        <div className="fixed top-20 w-64 left-8 z-30">
          <Alert />
        </div>
      )}
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
};
