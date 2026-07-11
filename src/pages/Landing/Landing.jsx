import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Workflow from "../../components/landing/Workflow";
import Footer from "../../components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      <Navbar />

      <main>

        <Hero />

        <Features />

        <Workflow />

      </main>

      <Footer />

    </div>
  );
}