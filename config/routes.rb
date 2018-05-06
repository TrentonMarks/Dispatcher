Rails.application.routes.draw do

    # =================================================
    #             ROUTES FOR UNAPPROVED MODEL
    # =================================================
    # GET/INDEX
    # credit card receipts
    get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
    # online receipts
    get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
    # cash receipts
    get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'
    # retake receipts
    get '/receipts/unapproved/retake', to: 'unapproved#retakeIndex'

    # GET/SHOW
    # receipt by id
    get '/receipts/unapproved/:id', to: 'unapproved#showReceipt'

    # PUT/UPDATE
    # retake receipt image
    put '/receipts/unapproved/:id/retake', to: 'unapproved#retakeReceipt'
    # approve receipt image
    put '/receipts/unapproved/:id/approve', to: 'unapproved#approveReceipt'
    # update receipt image
    put '/receipts/unapproved/:id/edit', to: 'unapproved#editReceipt'


    # =================================================
    #             ROUTES FOR APPROVED MODEL
    # =================================================
    # GET/INDEX
    # credit card receipts
    get '/receipts/approved/creditcard', to: 'approved#creditCardIndex'
    # online receipts
    get '/receipts/approved/online', to: 'approved#onlineIndex'
    # cash receipts
    get '/receipts/approved/cash', to: 'approved#cashIndex'
    # retake receipts
    get '/receipts/approved/retake', to: 'approved#retakeIndex'

    # GET/SHOW
    # receipt by id
    get '/receipts/approved/:id', to: 'approved#showReceipt'

    # PUT/UPDATE
    # approve receipt image
    put '/receipts/approved/:id/unapprove', to: 'approved#unapproveReceipt'


    # =================================================
    #             ROUTES FOR RESTAURANTS MODEL
    # =================================================
    # GET/INDEX
    # stats by day
    get '/statistics/restaurants/day', to: 'restaurants#dayIndex'
    # stats by week
    get '/statistics/restaurants/week', to: 'restaurants#weekIndex'
    # stats by month
    get '/statistics/restaurants/month', to: 'restaurants#monthIndex'

    # =================================================
    #             ROUTES FOR DRIVERS MODEL
    # =================================================
    # stats by day
    # get '/statistics/drivers/day', to: 'drivers#dayIndex'
    # stats by week
    # get '/statistics/drivers/week', to: 'drivers#weekIndex'
    # stats by month
    # get '/statistics/drivers/month', to: 'drivers#monthIndex'
    # =================================================
    #             ROUTES FOR HEAD MODEL
    # =================================================
    # stats by day
    # get '/statistics/head/day', to: 'head#dayIndex'
    # stats by week
    # get '/statistics/head/week', to: 'head#weekIndex'
    # stats by month
    # get '/statistics/head/month', to: 'head#monthIndex'

end
