import type React from "react";
import { assets } from "../../assets/assets";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearchSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={assets.hero_bg_img}
          alt="Dining Room"
          className="w-full h-full object-cover brightness-70"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 text-center">
        <span className="text-sm text-secondary-container tracking-wider uppercase block mb-4">
          Exquisite Dining Experiences
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-white mb-12 max-w-3xl mx-auto leading-[1.15] font-medium tracking-tight drop-shadow-md">
          Curation for the Discerning Palatte
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-3 md:p-2.5 ambient-shadow max-w-4xl mx-auto flex flex-col md:flex-row gap-2"
        >
          {/* Search Term */}
          <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
            <Search className="text-outline-variant mr-3 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search cuisines, restaurants"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-black/55"
            />
          </div>

          {/* Location */}
          <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
            <MapPin className="text-outline-variant mr-3 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-black/55"
            />
          </div>

          {/* Date */}
          <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
            <Calendar
              className="text-outline-variant mr-3 shrink-0"
              size={18}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-black/55 cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
            <Users
              className="text-outline-variant mr-3 shrink-0"
              size={18}
            />
            <select value={guests} onChange={(e)=> setGuests(e.target.value)} className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface cursor-pointer">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6 Guests</option>
              <option value="8">8 Guests</option>
            </select>
          </div>

          <button type="submit" className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 md:py-3 hover:bg-secondary hover:text-white animate-fade-in transition-colors duration-400 cursor-pointer">
            Find a Table
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
