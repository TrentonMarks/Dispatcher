class DriversController < ApplicationController
    skip_before_action :verify_authenticity_token

    #get index (all)
    def index
        render json: Driver.all
    end

end
