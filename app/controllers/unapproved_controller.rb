class UnapprovedController < ApplicationController
    skip_before_action :verify_authenticity_token

    #get index (all)
    def index
        render json: Unapproved.all
    end

    def create
      render json: Unapproved.create(params["unapproved"])
    end

end
