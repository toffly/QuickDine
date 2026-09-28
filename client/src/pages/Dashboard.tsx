import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  dummyFeaturedRestaurants,
  dummyMyBookingsData,
} from "../assets/assets";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAppContext();

  const [bookings, setBookings] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Fetch user Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setBookings(dummyMyBookingsData);
      setLoadingBookings(false);
    };

    // if (user) {
    fetchBookings();
    // }
  }, [user]);

  // Fetch Generic Recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setRecommendations(dummyFeaturedRestaurants);
    };
    fetchRecommendations();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  // if(!user) return null

  // Filter Bookings into upcoming and past
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBooking = bookings.filter((b) => {
    const bDate = new Date(b.date);
    return bDate >= today && b.status === "confirmed";
  });

  const pastBookings = bookings.filter((b) => {
    const bDate = new Date(b.date);
    return bDate < today || b.status !== "confirmed";
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      <AuthModal />

      <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
        {/* Main Content Area */}
        <div className="pb-4 border-b border-outline-variant/10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">
            Welcome back, {user?.name.split(" ")[0]}
          </h2>
          <p className="text-xs text-black/55 mt-1.5">
            Manage your upcoming dining experiences.
          </p>
        </div>

        <div className="space-y-10">
          {/* Upcoming Reservations */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium text-primary">
              Upcoming Bookings
            </h3>

            {loadingBookings ? (
              <div className="bg-white border border-outline-variant/10 p-12 text-center flex justify-center">
                <div className="w-6 h-6 border-2 border-outline-variant/30 border-t-secondary rounded-full animate-spin" />
              </div>
            ) : upcomingBooking.length === 0 ? (
              <div className="bg-white border border-outline-variant/10 p-12 text-center rounded-md">
                <CalendarDaysIcon
                  size={36}
                  className="mx-auto text-outline-variant mb-2"
                />
                <p className="text-xs text-black/55 italic">
                  No upcoming reservations schedule.
                </p>
                <Link
                  to={"/search"}
                  className="inline-block mt-4 bg-primary hover:bg-secondary text-white text-[10px] font-medium tracking-widest uppercase px-6 py-2.5 transition-colors"
                >
                  Book a Table
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBooking.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white border border-outline-variant/20 rounded-md p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-surface">
                        <img
                          src={b.restaurant?.image}
                          alt={b.restaurant?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
