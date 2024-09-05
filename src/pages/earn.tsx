import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import Earn from "@/components/Earn";
import { Footer } from "@/components/Footer";
import CardSection from "@/Section/CardSection";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>RainbowKit App - Earn</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <Header logo switchTab type='fixed' tabType='normal' />
            <Banner />
            <CardSection />
            <Earn col />
            <Footer />
        </div>
    );
};

export default Home;
