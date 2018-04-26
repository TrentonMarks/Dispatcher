Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/receipts/unapproved', to: 'unapproved#index'
  post '/receipts/unapproved', to: 'unapproved#create'

end
