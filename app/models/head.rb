class Head

    # attribute readers for instance access
    attr_accessor :orders, :restaurant_id, :total_deliveries, :delivery_fees, :tips_collected, :ten_percent_of_sales, :owed_by_restaurant

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_i
        @name = opts["name"]
        @total_deliveries = opts["total_deliveries"]
        @delivery_fees = opts["delilvery_fees"]
        @tips_collected = opts["tips_collected"]
        @ten_percent_of_sales = opts["ten_percent_of_sales"]
        @owed_by_restaurant = opts["owed_by_restaurant"]
        @orders = opts["orders"]
    end

    # GET ROUTES
    # get all head statistics by day
    def self.headDay
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        restaurants.id,
                        restaurants.name
                FROM orders
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
                WHERE orders.dropoff_at > '05-01-18'
                    AND orders.dropoff_at < '05-03-18'
            SQL
        )
        restaurants = []
        tips = []
        sales = []
        current_restaurant_id = nil
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
                            "cash_tip" => result["cash_tip"],
                            "delivery_time_mins" => result["delivery_time_mins"],
                            "PU_DO_time" => result["PU_DO_time"],
                            "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurants.last.total_deliveries = restaurants.last.orders.length
                # sets delivery_fees
                restaurants.last.delivery_fees = restaurants.last.total_deliveries * 2.99
                # sets tips_collected
                tips.push(restaurants.last.orders.last.submitted_tip)
                restaurants.last.tips_collected = (tips.reduce(0, :+))

                # sets ten_percent_of_sales
                sales.push(restaurants.last.orders.last.order_subtotal)
                restaurants.last.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)

                # sets owed_by_restaurant
                restaurants.last.owed_by_restaurant = (restaurants.last.delivery_fees + restaurants.last.tips_collected + restaurants.last.ten_percent_of_sales)

            elsif result["restaurant_id"] != current_restaurant_id
                current_restaurant_id = result["restaurant_id"]
                delivery_times = []
                tips = []
                sales = []
                restaurant = Head.new({
                    "id" => result["id"],
                    "name" => result["name"],
                    "total_deliveries" => nil,
                    "delivery_fees" => nil,
                    "tips_collected" => nil,
                    "ten_percent_of_sales" => nil,
                    "owed_by_restaurant" => nil,
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
                                "cash_tip" => result["cash_tip"],
                                "delivery_time_mins" => result["delivery_time_mins"],
                                "pu_do_time" => result["pu_do_time"],
                                "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurant.total_deliveries = restaurant.orders.length

                # sets delivery_fees
                restaurant.delivery_fees = restaurant.total_deliveries * 2.99

                # sets tips_collected
                restaurant.orders.each do |order|
                    tips.push(order.submitted_tip)
                    restaurant.tips_collected = (tips.reduce(0, :+))
                end

                # sets ten_percent_of_sales
                restaurant.orders.each do |order|
                    sales.push(order.order_subtotal)
                    restaurant.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)
                end

                # sets owed_by_restaurant
                restaurant.owed_by_restaurant = (restaurant.delivery_fees + restaurant.tips_collected + restaurant.ten_percent_of_sales)

                restaurants.push(restaurant)
            end
        end
        return restaurants
    end
    # get all head statistics by week
    def self.headWeek
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        restaurants.id,
                        restaurants.name
                FROM orders
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
                WHERE orders.dropoff_at > '04-30-18'
                    AND orders.dropoff_at < '05-06-18'
            SQL
        )
        restaurants = []
        tips = []
        sales = []
        current_restaurant_id = nil
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
                            "cash_tip" => result["cash_tip"],
                            "delivery_time_mins" => result["delivery_time_mins"],
                            "PU_DO_time" => result["PU_DO_time"],
                            "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurants.last.total_deliveries = restaurants.last.orders.length
                # sets delivery_fees
                restaurants.last.delivery_fees = restaurants.last.total_deliveries * 2.99
                # sets tips_collected
                tips.push(restaurants.last.orders.last.submitted_tip)
                restaurants.last.tips_collected = (tips.reduce(0, :+))

                # sets ten_percent_of_sales
                sales.push(restaurants.last.orders.last.order_subtotal)
                restaurants.last.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)

                # sets owed_by_restaurant
                restaurants.last.owed_by_restaurant = (restaurants.last.delivery_fees + restaurants.last.tips_collected + restaurants.last.ten_percent_of_sales)

            elsif result["restaurant_id"] != current_restaurant_id
                current_restaurant_id = result["restaurant_id"]
                delivery_times = []
                tips = []
                sales = []
                restaurant = Head.new({
                    "id" => result["id"],
                    "name" => result["name"],
                    "total_deliveries" => nil,
                    "delivery_fees" => nil,
                    "tips_collected" => nil,
                    "ten_percent_of_sales" => nil,
                    "owed_by_restaurant" => nil,
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
                                "cash_tip" => result["cash_tip"],
                                "delivery_time_mins" => result["delivery_time_mins"],
                                "pu_do_time" => result["pu_do_time"],
                                "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurant.total_deliveries = restaurant.orders.length

                # sets delivery_fees
                restaurant.delivery_fees = restaurant.total_deliveries * 2.99

                # sets tips_collected
                restaurant.orders.each do |order|
                    tips.push(order.submitted_tip)
                    restaurant.tips_collected = (tips.reduce(0, :+))
                end

                # sets ten_percent_of_sales
                restaurant.orders.each do |order|
                    sales.push(order.order_subtotal)
                    restaurant.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)
                end

                # sets owed_by_restaurant
                restaurant.owed_by_restaurant = (restaurant.delivery_fees + restaurant.tips_collected + restaurant.ten_percent_of_sales)

                restaurants.push(restaurant)
            end
        end
        return restaurants
    end
    # get all head statistics by month
    def self.headMonth
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        restaurants.id,
                        restaurants.name
                FROM orders
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
                WHERE orders.dropoff_at > '05-01-18'
                    AND orders.dropoff_at < '05-31-18'
            SQL
        )
        restaurants = []
        tips = []
        sales = []
        current_restaurant_id = nil
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
                            "cash_tip" => result["cash_tip"],
                            "delivery_time_mins" => result["delivery_time_mins"],
                            "PU_DO_time" => result["PU_DO_time"],
                            "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurants.last.total_deliveries = restaurants.last.orders.length
                # sets delivery_fees
                restaurants.last.delivery_fees = restaurants.last.total_deliveries * 2.99
                # sets tips_collected
                tips.push(restaurants.last.orders.last.submitted_tip)
                restaurants.last.tips_collected = (tips.reduce(0, :+))

                # sets ten_percent_of_sales
                sales.push(restaurants.last.orders.last.order_subtotal)
                restaurants.last.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)

                # sets owed_by_restaurant
                restaurants.last.owed_by_restaurant = (restaurants.last.delivery_fees + restaurants.last.tips_collected + restaurants.last.ten_percent_of_sales)

            elsif result["restaurant_id"] != current_restaurant_id
                current_restaurant_id = result["restaurant_id"]
                delivery_times = []
                tips = []
                sales = []
                restaurant = Head.new({
                    "id" => result["id"],
                    "name" => result["name"],
                    "total_deliveries" => nil,
                    "delivery_fees" => nil,
                    "tips_collected" => nil,
                    "ten_percent_of_sales" => nil,
                    "owed_by_restaurant" => nil,
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
                                "cash_tip" => result["cash_tip"],
                                "delivery_time_mins" => result["delivery_time_mins"],
                                "pu_do_time" => result["pu_do_time"],
                                "under_45" => result["under_45"]
                    })
                )
                # sets total_deliveries
                restaurant.total_deliveries = restaurant.orders.length

                # sets delivery_fees
                restaurant.delivery_fees = restaurant.total_deliveries * 2.99

                # sets tips_collected
                restaurant.orders.each do |order|
                    tips.push(order.submitted_tip)
                    restaurant.tips_collected = (tips.reduce(0, :+))
                end

                # sets ten_percent_of_sales
                restaurant.orders.each do |order|
                    sales.push(order.order_subtotal)
                    restaurant.ten_percent_of_sales = (sales.reduce(0, :+) / 10.00)
                end

                # sets owed_by_restaurant
                restaurant.owed_by_restaurant = (restaurant.delivery_fees + restaurant.tips_collected + restaurant.ten_percent_of_sales)

                restaurants.push(restaurant)
            end
        end
        return restaurants
    end

end
