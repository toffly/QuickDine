import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { dummyAvailability, dummyRestaurant } from "../assets/assets";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

const RestaurantDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, setIsAuthModalOpen } = useAppContext();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Booking Widget states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("2");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotAvailable, setSlotAvailable] = useState<any[]>([]);
  const [loadingSlot, setLoadingSlot] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setRestaurant(dummyRestaurant.find((r) => r.slug === slug));
      setLoading(false);
    };
    if (slug) {
      fetchRestaurant();
    }
  }, [slug, navigate]);

  useEffect(() => {
    const fetchAvailable = async () => {
      setSlotAvailable(dummyAvailability);
      setLoadingSlot(false);
    };
    fetchAvailable();
  }, [restaurant?._id, selectedDate]);

  if (loading) {
    return <Loader text="Loading Restaurant Details..." />;
  }

  if (!restaurant) return null;

  const handleReserveClick = () => {
    if (!selectedSlot) {
      toast.error("Please select a dining time slot.");
      return;
    }

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    //Redirect to Confirmation page with query params
    navigate(
      `/booking/${restaurant.slug}?slot=${selectedSlot}&date=${selectedDate}&guests=${selectedGuests}`,
    );
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      <AuthModal />

      {/* Hero Image Section */}
      
    </div>
  );
};

export default RestaurantDetail;
