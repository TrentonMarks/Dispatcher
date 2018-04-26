Rails.application.routes.draw do

  get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
  get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
  get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'

  get '/receipts/unapproved/creditcard/:id', to: 'unapproved#creditCardShow'
  get '/receipts/unapproved/online/:id', to: 'unapproved#onlineShow'
  get '/receipts/unapproved/cash/:id', to: 'unapproved#cashShow'




  # put '/receipts/unapproved/creditcard/:id', to: 'unapproved#'




end
