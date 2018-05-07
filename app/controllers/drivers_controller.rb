class DriversController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all stats by day
    def dayIndex
        render json: Driver.driversDay
    end
    # all stats by week
    def weekIndex
        render json: Driver.driversWeek
    end
    # all stats by month
    def monthIndex
        render json: Driver.driversMonth
    end

end
