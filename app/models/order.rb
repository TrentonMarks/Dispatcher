class Order

    attr_accessor :delivery_time, :restaurant_id

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_i
        @ordered_at = opts["ordered_at"]
        @assigned_at = opts["assigned_at"]
        @restaurant_id = opts["restaurant_id"]
        @driver_id = opts["driver_id"]
        @customer_phone = opts["customer_phone"]
        @customer_location_type = opts["customer_location_type"]
        @customer_address = opts["customer_address"]
        @customer_city = opts["customer_city"]
        @customer_state = opts["customer_state"]
        @customer_zip = opts["customer_zip"]
        @customer_latitude = opts["customer_latitude"]
        @customer_longitude = opts["customer_longitude"]
        @order_subtotal = opts["order_subtotal"]
        @payment_type = opts["payment_type"]
        @tip_type = opts["tip_type"]
        @selected_rbt = opts["selected_rbt"]
        @actual_rbt = opts["actual_rbt"]
        @delivery_notes = opts["delivery_notes"]
        @api_eta_at_restaurant = opts["api_eta_at_restaurant"]
        @here_restaurant_at = opts["here_restaurant_at"]
        @driver_latitude_at_restaurant = opts["driver_latitude_at_restaurant"]
        @driver_longitude_at_restaurant = opts["driver_longitude_at_restaurant"]
        @not_ready_at = opts["not_ready_at"]
        @pickup_at = opts["pickup_at"]
        @driver_latitude_at_pickup = opts["driver_latitude_at_pickup"]
        @driver_longitude_at_pickup = opts["driver_longitude_at_pickup"]
        @api_eta_at_customer = opts["api_eta_at_customer"]
        @here_customer_at = opts["here_customer_at"]
        @driver_latitude_at_customer = opts["driver_latitude_at_customer"]
        @driver_longitude_at_customer = opts["driver_longitude_at_customer"]
        @waiting_at = opts["waiting_at"]
        @wrong_address_at = opts["wrong_address_at"]
        @wrong_phone_at = opts["wrong_phone_at"]
        @no_answer_at = opts["no_answer_at"]
        @dropoff_at = opts["dropoff_at"]
        @driver_latitude_at_dropoff = opts["driver_latitude_at_dropoff"]
        @driver_longitude_at_dropoff = opts["driver_longitude_at_dropoff"]
        @receipt_image = opts["receipt_image"]
        @submitted_tip = opts["submitted_tip"]
        @receipt_approved = opts["receipt_approved"]
        @retake_receipt = opts["retake_receipt"]
        @receipt_approved_by_restaurant = opts["receipt_approved_by_restaurant"]
        @retake_receipt_by_restaurant = opts["retake_receipt_by_restaurant"]
        @no_tip = opts["no_tip"]
        @cash_tip = opts["cash_tip"]
        @delivery_time = (Time.parse(opts["dropoff_at"]) - Time.parse(opts["ordered_at"]))/60
        @avg_PU_DO_time = (Time.parse(opts["dropoff_at"]) - Time.parse(opts["pickup_at"]))/60
        @under_45 = @delivery_time > 45 ? false : true
    end

end
