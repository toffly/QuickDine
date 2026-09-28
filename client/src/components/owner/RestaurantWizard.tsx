import React, { useState } from "react";
import { dummyRestaurant } from "../../assets/assets";
import toast from "react-hot-toast";
import { Utensils } from "lucide-react";

interface RestaurantWizardProps {
  setRestaurant: (restaurant: any) => void;
}

const RestaurantWizard = ({ setRestaurant }: RestaurantWizardProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [priceRange, setPriceRange] = useState("$$");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [chef, setChef] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ]);
  const [totalSeats, setTotalSeats] = useState("20");
  const [formLoading, setFormLoading] = useState(false);

  const defaultsSlots = [
    "12:00",
    "13:00",
    "14:00",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const toggleSlot = (slot: string) => {
    if (availableSlots.includes(slot)) {
      setAvailableSlots(availableSlots.filter((s) => s !== slot));
    } else {
      setAvailableSlots([...availableSlots, slot].sort());
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateRestaurant = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("cuisine", cuisine);
      formData.append("priceRange", priceRange);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("chef", chef);
      formData.append("tags", tags);
      formData.append("availableSlots", availableSlots.join(","));
      formData.append("totalSeats", totalSeats);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      setRestaurant(dummyRestaurant[0]);
      toast.success(
        "Restaurant profile submitted successfully! Awaiting Admin approval.",
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to register restaurant",
      );
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-outline-variant/20 p-8 md:p-10 shadow-sm rounded-md space-y-6">
      <div className="text-center space-y-2 pb-6 border-b border-outline-variant/10">
        <Utensils size={36} className="mx-auto text-secondary" />
        <h2 className="font-display text-xl font-medium text-primary">
          Setup Restaurant Profile
        </h2>
        <p className="text-xs text-black/55">
          Please create your restaurant details. Once submitted, it will be
          pending approval from the Admin
        </p>
      </div>

      <form onSubmit={handleCreateRestaurant} className="space-y-5 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">
              Restaurant Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. L'Artiste"
              className="w-full bg-surface-container-low/30 border border-outline-variant/40 px-3 py-2.5 text-xs focus:border-secondary focus:outline-none rounded-sm"
            />
          </div>

            {/* Cuisine Type Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">
              Cuisine Type
            </label>
            <input
              type="text"
              required
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="e.g. French, Japanese"
              className="w-full bg-surface-container-low/30 border border-outline-variant/40 px-3 py-2.5 text-xs focus:border-secondary focus:outline-none rounded-sm"
            />
          </div>
        </div>

        {/* Descriptions Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">
              Description
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the experience, atmosphere and dining philosophy..."
              className="w-full bg-surface-container-low/30 border border-outline-variant/40 p-3 text-xs focus:border-secondary focus:outline-none rounded-sm overflow-scroll resize-none"
            />
          </div>
      </form>
    </div>
  );
};

export default RestaurantWizard;
