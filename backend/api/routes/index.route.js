import express from "express"
import RestaurantController from "../controllers/restaurants.controller.js"
import ReviewController from "../controllers/reviews.controller.js"
const router = express.Router()

router.route("/").get(RestaurantController.apiGetRestaurants)

router
    .route("/review")
    .post(ReviewController.apiPostReview)
    .put(ReviewController.apiUpdateReview)
    .delete(ReviewController.apiDeleteReview)

export default router