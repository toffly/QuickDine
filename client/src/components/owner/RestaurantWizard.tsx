import React, { useState } from "react";
import { dummyRestaurant } from "../../assets/assets";
import toast from "react-hot-toast";

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
      )
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to register restaurant")
    } finally {
        setFormLoading(false)
    }
  };

  return <div>RestaurantWizard</div>;
};

export default RestaurantWizard;
