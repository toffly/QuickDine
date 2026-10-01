import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.js";
import jwt from "jsonwebtoken";
import { userInfo } from "node:os";
import { User } from "../models/User.js";

// Get all restaurants with search filters
// Get /api/restaurants
export const getRestaurants = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { search, priceRange, rating, location, sort } = req.query;

    //Build query object
    const queryObject: any = { status: "approved" };

    if (search) {
      queryObject.$or = [
        { name: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (priceRange) {
      const prices = Array.isArray(priceRange) ? priceRange : [priceRange];
      queryObject.priceRange = { $in: prices };
    }

    if (rating) {
      queryObject.rating = { $gte: parseFloat(rating as string) };
    }

    if (location) {
      queryObject.location = { $regex: location as string, $options: "i" };
    }

    // Sorting
    let sortOption: any = { createdAt: -1 };
    if (sort === "rating") {
      sortOption = { rating: -1 };
    } else if (sort === "price_low") {
      sortOption = { priceRange: 1 };
    } else if (sort === "price_low") {
      sortOption = { priceRange: -1 };
    }

    const restaurant = await Restaurant.find(queryObject).sort(sortOption);
    res.json(restaurant);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get featured and exclusive restaurants
// GET /api/restaurants/featured
export const getFeaturedRestaurants = async (req: Request, res: Response) => {
  try {
    const featured = await Restaurant.find({
      status: "approved",
      $or: [{ featured: true }, { exclusive: true }],
    }).limit(6);
    res.json(featured);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single restaurant by slug
// Get /api/restaurants/:slug
export const getRestaurantBySlug = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({
      slug: req.params.slug,
    });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    // If not approved, verify authorization ( owner or admin)
    if (restaurant.status !== "approved") {
      let isAuthorized = false;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
          ) as { id: string };

          const user = await User.findById(decoded.id);

          if (
            user &&
            (user.role === "admin" ||
              (user.role === "owner" &&
                restaurant.owner.toString() === user._id.toString()))
          ) {
            isAuthorized = true;
          }
        } catch (error) {
          // Ignore token verify error
        }
      }
      if(!isAuthorized){
        res.status(404).json({message: "Restaurant not found or pending"})
        return
      }
    }
    res.json(restaurant);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get dynamic seat availability for slots
// Get /api/restaurants/:id/availability
export const getRestaurantAvailability = async (
  req: Request,
  res: Response,
): Promise<void> => {};
