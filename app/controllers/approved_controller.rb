class ApprovedController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all approved CC-receipts
    def creditCardIndex
        render json: Approved.allCreditCard
    end
    # all unapproved online-receipts
    def onlineIndex
        render json: Approved.allOnline
    end
    # all unapproved cash-receipts
    def cashIndex
        render json: Approved.allCash
    end
    # all unapproved retake-receipts
    def retakeIndex
        render json: Approved.allRetake
    end

    # GET/SHOW
    # show credit receipt-img of id
    def showReceipt
        render json: Approved.findReceipt(params["id"])
    end

    # PUT/UPDATE
    # receipt_approved is given value of NULL
    def unapproveReceipt
        render json: Approved.unapproveReceipt(params["id"], params["order"])
    end

end
