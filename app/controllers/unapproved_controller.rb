class UnapprovedController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET/INDEX
    # all unapproved CC-receipts
    def creditCardIndex
        render json: Unapproved.allCreditCard
    end
    # all unapproved online-receipts
    def onlineIndex
        render json: Unapproved.allOnline
    end
    # all unapproved cash-receipts
    def cashIndex
        render json: Unapproved.allCash
    end
    # all unapproved retake-receipts
    def retakeIndex
        render json: Unapproved.allRetake
    end

    # GET/SHOW
    # show credit receipt-img of id
    def showReceipt
        render json: Unapproved.findReceipt(params["id"])
    end

    # PUT/UPDATE
    # receipt_approved gains a timestamp value
    # def receiptApproved
    #     render json: Unapproved.approveReceipt(params["id"], params["unapproved"])
    # end
    # retake_receipt turns true
    # def receiptRetake
    #     render json: Unapproved.retakeReceipt(params["id"], params["order"])
    # end

end
