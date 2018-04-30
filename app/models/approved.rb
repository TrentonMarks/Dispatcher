class Approved

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_i
        @driver_id = opts["driver_id"].to_i
        @first_name = opts["first_name"]
        @last_name = opts["last_name"]
        @restaurant_id = opts["restaurant_id"].to_i
        @name = opts["name"]
        @order_time = opts["order_time"]
        @customer_address = opts["customer_address"]
        @order_subtotal = opts["order_subtotal"]
        @payment_type = opts["payment_type"]
        @tip_type = opts["tip_type"]
        @dropoff_time = opts["dropoff_time"]
        @receipt_image = opts["receipt_image"]
        @submitted_tip = opts["submitted_tip"]
        @receipt_approved = opts["receipt_approved"]
        @retake_receipt = opts["retake_receipt"]
        @no_tip = opts["no_tip"]
        @cash_tip = opts["cash_tip"]
    end

    # ROUTES
    # index/get - Approved CC Receipts
    def self.allCreditCard
        results = DB.exec(
            <<-SQL
                SELECT
                    orders.*,
                    drivers.first_name,
                    drivers.last_name,
                    restaurants.name
                FROM orders
                LEFT JOIN drivers
                    ON  orders.driver_id = drivers.id
                LEFT JOIN restaurants
                    ON  orders.restaurant_id = restaurants.id
                WHERE orders.receipt_approved IS NOT NULL
                    AND orders.payment_type = 'credit';
            SQL
        )
        return results
    end






    # index/get - Approved Online Receipts
    def self.allOnline
        results = DB.exec(
            <<-SQL
                SELECT
                    orders.*,
                    drivers.first_name,
                    drivers.last_name,
                    restaurants.name
                FROM orders
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
            SQL
        )
        return results.map do |result|
            if result["receipt_approved"] && result["payment_type"] === "online"
                    Approved.new({
                        "id" => result["id"],
                        "driver_id" => result["driver_id"],
                        "first_name" => result["first_name"],
                        "last_name" => result["last_name"],
                        "restaurant_id" => result["restaurant_id"],
                        "name" => result["name"],
                        "order_time" => result["order_time"],
                        "customer_address" => result["customer_address"],
                        "order_subtotal" => result["order_subtotal"],
                        "payment_type" => result["payment_type"],
                        "tip_type" => result["tip_type"],
                        "dropoff_time" => result["dropoff_time"],
                        "receipt_image" => result["receipt_image"],
                        "submitted_tip" => result["submitted_tip"],
                        "receipt_approved" => result["receipt_approved"],
                        "retake_receipt" => result["retake_receipt"],
                        "no_tip" => result["no_tip"],
                        "cash_tip" => result["cash_tip"]
                        })
            end
        end
    end
    # index/get - Approved Cash Receipts
    def self.allCash
        results = DB.exec(
            <<-SQL
                SELECT
                    orders.*,
                    drivers.first_name,
                    drivers.last_name,
                    restaurants.name
                FROM orders
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                LEFT JOIN restaurants
                    ON orders.restaurant_id = restaurants.id
            SQL
        )
        return results.map do |result|
            if result["receipt_approved"] && result["payment_type"] === "cash"
                    Approved.new({
                        "id" => result["id"],
                        "driver_id" => result["driver_id"],
                        "first_name" => result["first_name"],
                        "last_name" => result["last_name"],
                        "restaurant_id" => result["restaurant_id"],
                        "name" => result["name"],
                        "order_time" => result["order_time"],
                        "customer_address" => result["customer_address"],
                        "order_subtotal" => result["order_subtotal"],
                        "payment_type" => result["payment_type"],
                        "tip_type" => result["tip_type"],
                        "dropoff_time" => result["dropoff_time"],
                        "receipt_image" => result["receipt_image"],
                        "submitted_tip" => result["submitted_tip"],
                        "receipt_approved" => result["receipt_approved"],
                        "retake_receipt" => result["retake_receipt"],
                        "no_tip" => result["no_tip"],
                        "cash_tip" => result["cash_tip"]
                        })
            end
        end
    end

    # show/get - Unapproved Receipt by ID
    def self.findReceipt id
        results = DB.exec(
            <<-SQL
            SELECT
                orders.*,
                drivers.first_name,
                drivers.last_name,
                restaurants.name
            FROM orders
            LEFT JOIN drivers
                ON orders.driver_id = drivers.id
            LEFT JOIN restaurants
                ON orders.restaurant_id = restaurants.id
            WHERE orders.id = #{id}
            SQL
        )
        result = results.first
        if result ["id"]
            order = Unapproved.new({
                "id" => result["id"],
                "driver_id" => result["driver_id"],
                "first_name" => result["first_name"],
                "last_name" => result["last_name"],
                "restaurant_id" => result["restaurant_id"],
                "name" => result["name"],
                "order_time" => result["order_time"],
                "customer_address" => result["customer_address"],
                "order_subtotal" => result["order_subtotal"],
                "payment_type" => result["payment_type"],
                "tip_type" => result["tip_type"],
                "dropoff_time" => result["dropoff_time"],
                "receipt_image" => result["receipt_image"],
                "submitted_tip" => result["submitted_tip"],
                "receipt_approved" => result["receipt_approved"],
                "retake_receipt" => result["retake_receipt"],
                "no_tip" => result["no_tip"],
                "cash_tip" => result["cash_tip"]
                }
            )
            return order
        end
    end
end
