let restaurants

export default class RestaurantsDAO {

    static async injectDB(conn){
        if(restaurants) return
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e){
            console.error(`Unable to establish a collection handle to restaurants: ${e}`)
        }
    }

    static async getRestaurants({ 
            filters = null, page = 0, restaurantsPerPage = 20 
        } = {}) {

        let query
        if(filters){
            if("name" in filters){
                query = { $text: { $search: filters["name"] } }
            } else if("cuisine" in filters){
                query = {"cuisine": { $eq: filters["cuisine"] } }
            } else if("zipcode" in filters){
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor
        try{
            cursor = await restaurants.find(query)
        } catch(e){
            console.error(`Unable to find: ${e} `)
            return {
                restaurantsList : [],
                totalRestaurants: 0
            }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const totalRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList , totalRestaurants }
        } catch(e){
            console.error(`Unable to convert cursor to array or problem counting document, ${e} `)
            return {
                restaurantsList : [],
                totalRestaurants: 0
            }
        }

    }
}