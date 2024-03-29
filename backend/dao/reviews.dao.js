import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

var reviews

export default class ReviewsDAO {

    static async injectDB(conn){
        if(reviews) return
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e){
            console.error(`Unable to establish a collection handle to review: ${e}`)
        }
    }

    static async addReview(restaurantId, userInfo, review, date) {
        try{
            const reviewDoc = {
                name: userInfo.name,
                user_id: userInfo._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId)
            }
            return await reviews.insertOne(reviewDoc)
        } catch(e){
            console.error(`Unable to post review: ${e} `)
            return { error : e.message }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try{
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set : { text:text, date:date } }
            )
            return updateResponse
        } catch(e){
            console.error(`Unable to update review: ${e} `)
            return { error : e.message }
        }
    }

    static async deleteReview(reviewId, userId) {
        try{
            const deleteResponse = await reviews.deleteOne({ 
                _id: ObjectId(reviewId),
                user_id: userId
            })
            return deleteResponse
        } catch(e){
            console.error(`Unable to delete review: ${e} `)
            return { error : e.message }
        }
    }
}