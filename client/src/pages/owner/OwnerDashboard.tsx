import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { dummyMyBookingsData, dummyRestaurant } from "../../assets/assets";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

const OwnerDashboard = () => {
  const { logout } = useAppContext();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<"bookings" | "details">("bookings");

  const fetchOwnerData = async () => {
    setRestaurant(dummyRestaurant[0]);
    setBookings(dummyMyBookingsData);
    setLoading(false);
  };

  useEffect(() => {
    (async () => await fetchOwnerData())();
  }, []);

  if (loading) {
    return <Loader text="Loading Owner Dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/10 pb-8 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-primary">
              Restaurant Portal
            </h1>
            <p className="text-xs text-black/55 mt-1.5">
              Review capacity limits and process live reservations.
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-error-container hover:bg-error-container/85 text-error px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Case 1: No Restaurant Setup Profile */}
       
      </main>
    </div>
  );
};

export default OwnerDashboard;
