import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyRestaurant } from "../assets/assets";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { MapPin, SearchIcon, SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter state initialized from URL params
  const searchVal = searchParams.get("search") || "";
  const locationVal = searchParams.get("location") || "";
  const cuisinesSelected = searchParams.get("cuisine");
  const pricesSelected = searchParams.get("priceRange");
  const sortVal = searchParams.get("sort") || "";

  // Temp text inputs for immediate user typing (submit on enter/click)
  const [tempSearch, setTempSearch] = useState(searchVal);
  const [tempLocation, setTempLocation] = useState(locationVal);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setRestaurants(dummyRestaurant);
      setLoading(false);
    };
    fetchRestaurants();
  }, [searchParams]);

  const handleTextSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);

    if (tempSearch) {
      nextParams.set("search", tempSearch);
    } else {
      nextParams.delete("search");
    }

    if (tempLocation) {
      nextParams.set("location", tempLocation);
    } else {
      nextParams.delete("location");
    }

    setSearchParams(nextParams);
  };

  const handleCuisineToggle = (cuisine: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const current = nextParams.getAll("cuisine");

    if (current.includes(cuisine)) {
      const updated = current.filter((c) => c !== cuisine);
      nextParams.delete("cuisine");
      updated.forEach((u) => nextParams.append("cuisine", u));
    } else {
      nextParams.append("cuisine", cuisine);
    }
    setSearchParams(nextParams);
  };

  const handlePriceToggle = (price: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const current = nextParams.getAll("priceRange");

    if (current.includes(price)) {
      const updated = current.filter((c) => c !== price);
      nextParams.delete("priceRange");
      updated.forEach((u) => nextParams.append("priceRange", u));
    } else {
      nextParams.append("priceRange", price);
    }
    setSearchParams(nextParams);
  };

  const handleSortChange = (sort: string) => {
    const nextParams = new URLSearchParams();
    if (sort) {
      nextParams.set("sort", sort);
    } else {
      nextParams.delete("sort");
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setTempSearch("");
    setTempLocation("");
  };

  const priceOptions = ["$", "$$", "$$$", "$$$$"];
  const cuisineOptions = [
    "Italian",
    "Frence",
    "Japanese",
    "Steakhouse",
    "Vegetarian",
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      <AuthModal />

      {/* Sub-header / Search inputs */}
      <div className="bg-white border-b border-outline-variant/10 py-4 z-10 sticky top-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form
            onSubmit={handleTextSubmit}
            className="flex flex-wrap items-center gap-3 w-full md:w-auto"
          >
            <div className="relative grow sm:grow-0 min-w-50">
              <SearchIcon
                size={16}
                className="absolute left-2.5 top-2.5 text-black/55/70"
              />
              <input
                type="text"
                placeholder="Search cuisine or name..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                className="w-full pl-9 py-3 pr-2 text-xs border border-outline-variant/40 rounded-md focus:border-secondary focus:outline-none bg-surface-container-low/30"
              />
            </div>
            <div className="relative grow sm:grow-0 min-w-50">
              <MapPin
                size={16}
                className="absolute left-2.5 top-2.5 text-black/55/70"
              />
              <input
                type="text"
                placeholder="Location..."
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                className="w-full pl-9 py-3 pr-2 text-xs border border-outline-variant/40 rounded-md focus:border-secondary focus:outline-none bg-surface-container-low/30"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white text-[10px] font-medium tracking-wider uppercase px-5 py-2.5 cursor-pointer rounded-md transition-colors"
            >
              Update
            </button>
          </form>

          <div className="flex gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-1.5 border border-outline-variant/50 hover:border-primary text-xs font-medium px-4 py-2 bg-white cursor-pointer transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
