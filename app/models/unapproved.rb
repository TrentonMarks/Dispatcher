class Unapproved

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
        @order_subtotal = opts["order_subtotal"].to_i
        @payment_type = opts["payment_type"]
        @tip_type = opts["tip_type"]
        @dropoff_time = opts["dropoff_time"]
        @receipt_image = opts["receipt_image"]
        @submitted_tip = opts["submitted_tip"].to_i
        @receipt_approved = opts["receipt_approved"]
        @retake_receipt = opts["retake_receipt"]
        @no_tip = opts["no_tip"]
        @cash_tip = opts["cash_tip"]
    end

    # GET ROUTES
    # CC Receipts
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
                WHERE   orders.receipt_image IS NOT NULL
                    AND orders.receipt_approved IS NULL
                    AND orders.retake_receipt IS NOT true
                    AND orders.payment_type = 'credit';
            SQL
        )
        return results
    end
    # Online Receipts
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
                    ON  orders.driver_id = drivers.id
                LEFT JOIN restaurants
                    ON  orders.restaurant_id = restaurants.id
                WHERE   orders.receipt_image IS NOT NULL
                    AND orders.receipt_approved IS NULL
                    AND orders.retake_receipt IS NOT true
                    AND orders.payment_type = 'online';
            SQL
        )
        return results
    end
    # Cash Receipts
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
                    ON  orders.driver_id = drivers.id
                LEFT JOIN restaurants
                    ON  orders.restaurant_id = restaurants.id
                WHERE   orders.receipt_image IS NOT NULL
                    AND orders.receipt_approved IS NULL
                    AND orders.retake_receipt IS NOT true
                    AND orders.payment_type = 'cash';
            SQL
        )
        return results
    end
    # Retake Receipts
    def self.allRetake
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
            WHERE orders.retake_receipt = true;
            SQL
        )
        return results
    end

    # SHOW ROUTE
    # Unapproved by ID
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
        return result
    end

    # PUT ROUTES
    # Retake Unapproved Receipt by Id
    def self.retakeReceipt id, opts
        results = DB.exec(
            <<-SQL
                UPDATE orders
                SET retake_receipt = true
                WHERE id = #{id}
            SQL
        )
    end
    # Approve Unapproved Receipt by Id
    def self.approveReceipt id, opts
        results = DB.exec(
            <<-SQL
                UPDATE orders
                SET receipt_approved = current_timestamp, retake_receipt = NULL
                WHERE id = #{id}
            SQL
        )
    end
    # Update Unapproved Receipt by Id
    def self.editReceipt id, opts
        results = DB.exec(
            <<-SQL
                UPDATE orders
                SET customer_address='#{opts["customer_address"]}'
                WHERE id=#{id}
            SQL
        )
    end

end
