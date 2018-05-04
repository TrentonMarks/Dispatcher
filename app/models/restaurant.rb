class Restaurant

    # attribute readers for instance access
    attr_accessor :orders, :total_deliveries


    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_i
        @name = opts["name"]
        @avg_PU_DO_time = opts["avg_PU_DO_time"]
        @percent_under_45 = opts["percent_under_45"]
        @avg_delivery_time = opts["avg_delivery_time"]
        @total_deliveries = opts["total_deliveries"]
        @orders = opts["orders"]
    end



    # GET ROUTES
    # get all restaurant statistics by day
    def self.restaurantsDay
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        restaurants.id,
                        restaurants.name,
                        drivers.id AS drivers_id,
                        drivers.first_name,
                        drivers.last_name
                FROM orders
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                WHERE orders.dropoff_at >= '05-01-18'
                    AND orders.dropoff_at <= '05-03-18'
            SQL
        )
        restaurants = []
        current_restaurant_id = nil
        current_order_id = nil
        total_deliveries = nil
        results.each do |result|
            if result["restaurant_id"] === current_restaurant_id
                restaurants.last.orders.push(
                    Order.new({
                            "id" => result["order_id"],
                            "ordered_at" => result["ordered_at"],
                            "assigned_at" => result["assigned_at"],
                            "restaurant_id" => result["restaurant_id"],
                            "driver_id" => result["driver_id"],
                            "customer_phone" => result["customer_phone"],
                            "customer_location_type" => result["customer_location_type"],
                            "customer_address" => result["customer_address"],
                            "customer_city" => result["customer_city"],
                            "customer_state" => result["customer_state"],
                            "customer_zip" => result["customer_zip"],
                            "customer_latitude" => result["customer_latitude"],
                            "customer_longitude" => result["customer_longitude"],
                            "order_subtotal" => result["order_subtotal"],
                            "payment_type" => result["payment_type"],
                            "tip_type" => result["tip_type"],
                            "selected_rbt" => result["selected_rbt"],
                            "actual_rbt" => result["actual_rbt"],
                            "delivery_notes" => result["delivery_notes"],
                            "api_eta_at_restaurant" => result["api_eta_at_restaurant"],
                            "here_restaurant_at" => result["here_restaurant_at"],
                            "driver_latitude_at_restaurant" => result["driver_latitude_at_restaurant"],
                            "driver_longitude_at_restaurant" => result["driver_longitude_at_restaurant"],
                            "not_ready_at" => result["not_ready_at"],
                            "pickup_at" => result["pickup_at"],
                            "driver_latitude_at_pickup" => result["driver_latitude_at_pickup"],
                            "driver_longitude_at_pickup" => result["driver_longitude_at_pickup"],
                            "api_eta_at_customer" => result["api_eta_at_customer"],
                            "here_customer_at" => result["here_customer_at"],
                            "driver_latitude_at_customer" => result["driver_latitude_at_customer"],
                            "driver_longitude_at_customer" => result["driver_longitude_at_customer"],
                            "waiting_at" => result["waiting_at"],
                            "wrong_address_at" => result["wrong_address_at"],
                            "wrong_phone_at" => result["wrong_phone_at"],
                            "no_answer_at" => result["no_answer_at"],
                            "dropoff_at" => result["dropoff_at"],
                            "driver_latitude_at_dropoff" => result["driver_latitude_at_dropoff"],
                            "driver_longitude_at_dropoff" => result["driver_longitude_at_dropoff"],
                            "receipt_image" => result["receipt_image"],
                            "submitted_tip" => result["submitted_tip"],
                            "receipt_approved" => result["receipt_approved"],
                            "retake_receipt" => result["retake_receipt"],
                            "receipt_approved_by_restaurant" => result["receipt_approved_by_restaurant"],
                            "retake_receipt_by_restaurant" => result["retake_receipt_by_restaurant"],
                            "no_tip" => result["no_tip"],
                            "cash_tip" => result["cash_tip"]
                    })
                )
                restaurants.last.total_deliveries = restaurants.last.orders.length
            elsif result["restaurant_id"] != current_restaurant_id
                current_restaurant_id = result["restaurant_id"]
                restaurant = Restaurant.new({
                    "id" => result["id"],
                    "name" => result["name"],
                    "avg_PU_DO_time" => nil,
                    "percent_under_45" => nil,
                    "avg_delivery_time" => nil,
                    "total_deliveries" => total_deliveries,
                    "orders" => []
                })
                restaurant.orders.push(
                    Order.new({
                                "id" => result["order_id"],
                                "ordered_at" => result["ordered_at"],
                                "assigned_at" => result["assigned_at"],
                                "restaurant_id" => result["restaurant_id"],
                                "driver_id" => result["driver_id"],
                                "customer_phone" => result["customer_phone"],
                                "customer_location_type" => result["customer_location_type"],
                                "customer_address" => result["customer_address"],
                                "customer_city" => result["customer_city"],
                                "customer_state" => result["customer_state"],
                                "customer_zip" => result["customer_zip"],
                                "customer_latitude" => result["customer_latitude"],
                                "customer_longitude" => result["customer_longitude"],
                                "order_subtotal" => result["order_subtotal"],
                                "payment_type" => result["payment_type"],
                                "tip_type" => result["tip_type"],
                                "selected_rbt" => result["selected_rbt"],
                                "actual_rbt" => result["actual_rbt"],
                                "delivery_notes" => result["delivery_notes"],
                                "api_eta_at_restaurant" => result["api_eta_at_restaurant"],
                                "here_restaurant_at" => result["here_restaurant_at"],
                                "driver_latitude_at_restaurant" => result["driver_latitude_at_restaurant"],
                                "driver_longitude_at_restaurant" => result["driver_longitude_at_restaurant"],
                                "not_ready_at" => result["not_ready_at"],
                                "pickup_at" => result["pickup_at"],
                                "driver_latitude_at_pickup" => result["driver_latitude_at_pickup"],
                                "driver_longitude_at_pickup" => result["driver_longitude_at_pickup"],
                                "api_eta_at_customer" => result["api_eta_at_customer"],
                                "here_customer_at" => result["here_customer_at"],
                                "driver_latitude_at_customer" => result["driver_latitude_at_customer"],
                                "driver_longitude_at_customer" => result["driver_longitude_at_customer"],
                                "waiting_at" => result["waiting_at"],
                                "wrong_address_at" => result["wrong_address_at"],
                                "wrong_phone_at" => result["wrong_phone_at"],
                                "no_answer_at" => result["no_answer_at"],
                                "dropoff_at" => result["dropoff_at"],
                                "driver_latitude_at_dropoff" => result["driver_latitude_at_dropoff"],
                                "driver_longitude_at_dropoff" => result["driver_longitude_at_dropoff"],
                                "receipt_image" => result["receipt_image"],
                                "submitted_tip" => result["submitted_tip"],
                                "receipt_approved" => result["receipt_approved"],
                                "retake_receipt" => result["retake_receipt"],
                                "receipt_approved_by_restaurant" => result["receipt_approved_by_restaurant"],
                                "retake_receipt_by_restaurant" => result["retake_receipt_by_restaurant"],
                                "no_tip" => result["no_tip"],
                                "cash_tip" => result["cash_tip"]
                    })
                )
                restaurant.total_deliveries = restaurant.orders.length
                restaurants.push(restaurant)
            end
        end
        return restaurants
    end
end
