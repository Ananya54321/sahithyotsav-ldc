import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import LiveFeed from "./components/LiveFeed";
import MerchShowcase from "./components/MerchShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <MerchShowcase />
      <LiveFeed />
      <Highlights />
    </>
  );
}
