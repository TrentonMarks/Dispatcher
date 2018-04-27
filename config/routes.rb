Rails.application.routes.draw do

    # INDEX Unapproved Receipts
    # credit card receipts
    get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
    # online receipts
    get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
    # cash receipts
    get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'
    # retake receipts
    get '/receipts/unapproved/retake', to: 'unapproved#retakeIndex'
    # SHOW Unapproved Receipt
    # receipt by id
    get '/receipts/unapproved/:id', to: 'unapproved#receiptShow'
    # UPDATE Unapproved Receipt
    # retake receipt image
    # put '/receipts/unapproved/:id/retake', to: 'unapproved#receiptRetake'
    # approve receipt image
    # put '/receipts/unapproved/:id/approved', to: 'unapproved#receiptApproved'


    # INDEX Approved Receipts
    # credit card receipts
    get '/receipts/approved/creditcard', to: 'approved#creditCardIndex'
    # online receipts
    get '/receipts/approved/online', to: 'approved#onlineIndex'
    # cash receipts
    get '/receipts/approved/cash', to: 'approved#cashIndex'
    # SHOW Unapproved Receipt
    # receipt by id
    get '/receipts/approved/:id', to: 'approved#receiptShow'



end
