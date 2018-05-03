class Restaurant

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    # UNFINISHED
    def initialize opts
        @id = opts["id"].to_i
        @name = opts["name"]
        @avg_PU_DO_time = opts["avg_PU_DO_time"].to_i
        @percent_under_45 = opts["percent_under_45"].to_i
        @avg_delivery_time = opts["avg_delivery_time"].to_i
        @total_deliveries = opts["total_deliveries"].to_i
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
        results.each do |result|
            if result["restaurant_id"] != current_restaurant_id
                current_restaurant_id = result["restaurant_id"]
                restaurants.push(
                    Restaurant.new({
                        "id" => result["id"],
                        "name" => result["name"],
                        "avg_PU_DO_time" => nil,
                        "percent_under_45" => nil,
                        "avg_delivery_time" => nil,
                        "total_deliveries" => nil,
                        "orders" => []
                    })
                )
            end
            if result["order_id"]
                order = Order.new({
                    "id" => result["order_id"]
                })
            end
        end
        return restaurants
    end


end
