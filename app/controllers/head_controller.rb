class HeadController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all stats by day
    def dayIndex
        render json: Head.headDay
    end
    # all stats by week
    def weekIndex
        render json: Head.headWeek
    end
    # all stats by month
    def monthIndex
        render json: Head.headMonth
    end

end
