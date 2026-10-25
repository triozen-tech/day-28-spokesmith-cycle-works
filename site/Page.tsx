import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Browse from "./components/Browse";
import Shop from "./components/Shop";
import Compare from "./components/Compare";
import Book from "./components/Book";
import Story from "./components/Story";
import Signature from "./components/Signature";
import Process from "./components/Process";
import Footer from "./components/Footer";
import MarqueeStrip from "./components/MarqueeStrip";
import Edge from "./components/Edge";
import Fx from "./components/Fx";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Browse />
      <MarqueeStrip />
      <Shop />
      <Compare />
      <Book />
      <Story />
      <Edge above="#ffd500" below="#2b2d2f" />
      <Signature />
      <Edge above="#2b2d2f" below="#f4f1e6" />
      <Process />
      <Footer />
      <Fx />
    </main>
  );
}
