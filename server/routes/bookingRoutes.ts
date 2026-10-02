import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { cancelBooking, createBooking, getMyBookings } from "../controllers/bookingController.js";

const bookingRouter = Router()

bookingRouter.use(protect)

bookingRouter.post("/", createBooking)
bookingRouter.get("/my", getMyBookings)
bookingRouter.put("/:id/cancel",cancelBooking)

export default bookingRouter

