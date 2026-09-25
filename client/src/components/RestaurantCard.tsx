import { MapPinIcon, Star } from "lucide-react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummyRating } from "../assets/assets";

interface RestaurantCardProps {
  restaurant: {
    _id: string;
    name: string;
    slug: string;
    cuisine: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    location: string;
    image: string;
    availableSlots: string[];
    featured?: boolean;
    exclusive?: boolean;
  };
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();

  const handleSlotClick = (e: React.MouseEvent, slot: string) => {
    e.preventDefault();
    e.stopPropagation();
    const today = new Date().toISOString().split("T")[0];
    navigate(`/bookings/${restaurant.slug}?slot=${slot}&date${today}`);
  };
  return (
    <div className="group relative bg-white border border-outline-variant/10 card-hover-effect overflow-hidden rounded-md flex flex-col h-full">
      {/* Image & Badge */}
      <Link
        to={`restaurant/${restaurant.slug}`}
        className="relative h-60 overflow-hidden block"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full objectcover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        {/* Exclusive & Featured Badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {restaurant.exclusive && (
            <span className="text-[9px] font-medium tracking-widest text-white bg-secondary py-1 px-2.5 uppercase">
              Exclusive
            </span>
          )}
          {restaurant.featured && (
            <span className="text-[9x] font-medium tracking-widest text-on-primary bg-primary py-1 px-2.5 uppercase">
              Recommend
            </span>
          )}
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow metadata */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-medium text-black/55">
              {restaurant.cuisine}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-black/55">
                {restaurant.priceRange}
              </span>
              <span className="text-black/55/30 text-xs">·</span>
              <div className="flex items-center gap-0.5 text-secondary">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-medium text-primary">
                  {dummyRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Restaurant Title */}
          <Link to={`/restaurant/${restaurant.slug}`} className="block mb-2">
            <h3 className="font-display text-lg font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-xs text-black/55 mb-4 items-center gap-1">
            <MapPinIcon size={14} className="text-black/55/70" />
            {restaurant.location}
          </p>

          {/* Quick Slots */}
          <div>
            <div className="border-t border-outline-variant/10 my-3">
              <span className="block text-[9px] font-medium text-black/55 tracking-wider uppercase mb-2">
                Quick Reservation
              </span>
              <div className="flex flex-wrap gap1.5">
                {restaurant
                  .availableSlots((slot) => {
                    const [slotHour, slotMinunte] = slot.split(":").map(Number);
                    const now = new Date();
                    const currentHour = now.getHours();
                    const currentMinute = now.getMinutes();
                    return (
                      slotHour > currentHour ||
                      (slotHour === currentHour && slotMinunte > currentMinute)
                    );
                  })
                  .slice(0, 3)
                  .map((slot) => (
                    <button
                      key={slot}
                      onClick={(e) => handleSlotClick(e, slot)}
                      className="text-[10px] font-medium border border-outline-variant/60 hover:border-primary px-3 py-1.5 transition-colors cursor-pointer text-black/55 hover:text-primary bg-surface"
                    >
                      {slot}
                    </button>
                  ))}
                <Link
                  to={`/restaurant/${restaurant.slug}`}
                  className="text-[10px] font-medium border border-outline-variant/20 px-3 py-1.5 transition-colors cursor-pointer text-secondary hover:bg-secondary hover:text-white"
                >
                  All Slots
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
