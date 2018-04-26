Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/receipts/unapproved/creditcard', to: 'unapproved#creditCardIndex'
  get '/receipts/unapproved/online', to: 'unapproved#onlineIndex'
  get '/receipts/unapproved/cash', to: 'unapproved#cashIndex'


end
