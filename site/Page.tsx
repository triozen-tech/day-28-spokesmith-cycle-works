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

const Tape = () => <div className="sm-tape" aria-hidden />;

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Browse />
      <Shop />
      <Compare />
      <Book />
      <Story />
      <Tape />
      <Signature />
      <Tape />
      <Process />
      <Footer />
    </main>
  );
}
