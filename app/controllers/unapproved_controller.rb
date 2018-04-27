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
    # get index (all unapproved retake-receipts)
    def retakeIndex
        render json: Unapproved.allRetakes
    end

    # GET/SHOW
    #get show (show credit receipt-img of id)
    def receiptShow
        render json: Unapproved.findReceipt(params["id"])
    end

    def receiptApproved
        render json: Unapproved.approveReceipt(params["id"], params["order"])
    end

end
