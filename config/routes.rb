Rails.application.routes.draw do

    # INDEX Unapproved Receipts
    # credit card receipts
    get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
    # online receipts
    get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
    # cash receipts
    get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'

    # SHOW Unapproved Receipt
    get '/receipts/unapproved/:id', to: 'unapproved#receiptShow'




    # put '/receipts/unapproved/:id/retake', to: 'unapproved#creditCardRetake'
    # put '/receipts/unapproved/:id/approved', to: 'unapprovedcreditCardApproved#'





end
