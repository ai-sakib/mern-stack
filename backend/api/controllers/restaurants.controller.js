import RestaurantsDAO from "../../dao/restaurants.dao.js"

export default class RestaurantController {
    static async apiGetRestaurants(req, res, next)
    {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        } else if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        } else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }

        const { restaurantsList, totalRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalRestaurants
        }

        res.json(response)
    }

    

}