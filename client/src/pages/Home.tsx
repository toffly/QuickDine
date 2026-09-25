import { useState } from "react"
import AuthModal from "../components/AuthModal"
import Footer from "../components/Footer"
import CuisineBrowse from "../components/home/CuisineBrowse"
import Hero from "../components/home/Hero"
import MembershipSection from "../components/home/MembershipSection"
import NewsletterCTA from "../components/home/NewsletterCTA"
import TrendingRow from "../components/home/TrendingRow"
import Navbar from "../components/Navbar"

const Home = () => {
  const [trending, setTrending] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0">
        <Navbar/>
        <AuthModal/>
        <main className="flex-1">
            <Hero/>
            <CuisineBrowse/>
            <TrendingRow trending={trending} loading={loading}/>
            <MembershipSection/>
            <NewsletterCTA/>
        </main>
        <Footer/>
    </div>
  )
}

export default Home