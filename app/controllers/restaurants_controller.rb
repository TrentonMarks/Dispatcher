class RestaurantsController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all stats by day
    def dayIndex
        render json: Restaurant.dayIndex
    end
    # all stats by week
    # def weekIndex
    #     render json: Restaurant.weekIndex
    # end
    # all stats by month
    # def monthIndex
    #     render json: Restaurant.monthIndex
    # end

end
