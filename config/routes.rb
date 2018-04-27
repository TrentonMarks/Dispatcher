Rails.application.routes.draw do

    # INDEX Unapproved Receipts
    # credit card receipts
    get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
    # online receipts
    get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
    # cash receipts
    get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'
    get '/receipts/unapproved/retake', to: 'unapproved#retakeIndex'


    # SHOW Unapproved Receipt
    get '/receipts/unapproved/:id', to: 'unapproved#receiptShow'

    # UPDATE Unapproved Receipt
    # retake receipt image
    # put '/receipts/unapproved/:id/retake', to: 'unapproved#receiptRetake'
    # approve receipt image
    put '/receipts/unapproved/:id/approved', to: 'unapproved#receiptApproved'





end
