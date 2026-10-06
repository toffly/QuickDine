import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import CuisineBrowse from "../components/home/CuisineBrowse";
import Hero from "../components/home/Hero";
import MembershipSection from "../components/home/MembershipSection";
import NewsletterCTA from "../components/home/NewsletterCTA";
import TrendingRow from "../components/home/TrendingRow";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import api from "../lib/api";

const Home = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/restaurants/featured");
        setTrending(res.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending()
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0">
      <Navbar />
      <AuthModal />
      <main className="flex-1">
        <Hero />
        <CuisineBrowse />
        <TrendingRow trending={trending} loading={loading} />
        <MembershipSection />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
