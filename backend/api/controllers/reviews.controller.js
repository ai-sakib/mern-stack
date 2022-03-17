import ReviewsDAO from "../../dao/reviews.dao.js"

export default class ReviewController {
    static async apiPostReview(req, res, next)
    {
        try{
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()

            const reviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )
            
            var {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error (
                    "Unable to post review - user may not be original poster"
                )
            }
            res.json({success: "success"})

        } catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next)
    {
        try{
            
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                text,
                date
            )

            var {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error (
                    "Unable to update review - user may not be original poster"
                )
            }

            res.json({success: "success"})
        } catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next)
    {
        try{
            const reviewId = req.query.review_id
            const userId = req.body.user_id

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )

            var {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error (
                    "Somthing went wrong !"
                )
            }

            res.json({success: "success"})
        } catch (e){
            res.status(500).json({error: e.message})
        }
    }

}