class UnapprovedController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    #get index (all unapproved CC-receipts)
    def creditCardIndex
        render json: Unapproved.allCreditCard
    end
    #get index (all unapproved online-receipts)
    def onlineIndex
        render json: Unapproved.allOnline
    end
    #get index (all unapproved cash-receipts)
    def cashIndex
        render json: Unapproved.allCash
    end

    # GET/SHOW
    #get show (show credit receipt-img of id)
    def creditCardShow
        render json: Unapproved.findCreditCard(params["id"])
    end
    # get show (show online receipt-img of id)
    def onlineShow
        render json: Unapproved.findOnline(params["id"])
    end
    # # get show (show cash receipt-img of id)
    def cashShow
        render json: Unapproved.findCash(params["id"])
    end


end
