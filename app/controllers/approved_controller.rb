class ApprovedController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all approved CC-receipts
    def creditCardIndex
        render json: Approved.allCreditCard
    end
    # all approved online-receipts
    def onlineIndex
        render json: Approved.allOnline
    end
    # all approved cash-receipts
    def cashIndex
        render json: Approved.allCash
    end

    # GET/SHOW
    # show credit receipt-img of id
    def receiptShow
        render json: Approved.findReceipt(params["id"])
    end

end
