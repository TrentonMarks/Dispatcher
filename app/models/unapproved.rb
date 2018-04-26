class Unapproved

    # attribute readers for instance access
    # attr_reader :id, :driver_id, :restaurant_id, :order_time, :customer_address, :order_subtotal, :payment_type, :tip_type, :dropoff_time, :receipt_image, :submitted_tip, :receipt_approved, :retake_receipt, :no_tip, :cash_tip

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_i
        @driver_id = opts["driver_id"].to_i
        @restaurant_id = opts["restaurant_id"].to_i
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
    # index/get - Unapproved CC Receipts
    def self.allCreditCard
        results = DB.exec(
            <<-SQL
                SELECT * FROM orders;
            SQL
        )
        return results.map do |result|
            if result["receipt_image"] && result["receipt_approved"] === nil && result["retake_receipt"] ===nil && result["payment_type"] === "credit"
                    Unapproved.new({
                            "id" => result["id"],
                            "driver_id" => result["driver_id"],
                            "restaurant_id" => result["restaurant_id"],
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

    # index/get - Unapproved Online Receipts
    def self.allOnline
        results = DB.exec(
            <<-SQL
                SELECT * FROM orders;
            SQL
        )
        return results.map do |result|
            if result["receipt_image"] && result["receipt_approved"] === nil && result["retake_receipt"] ===nil && result["payment_type"] === "online"
                    Unapproved.new({
                            "id" => result["id"],
                            "driver_id" => result["driver_id"],
                            "restaurant_id" => result["restaurant_id"],
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

    # index/get - Unapproved Cash Receipts
    def self.allOnline
        results = DB.exec(
            <<-SQL
                SELECT * FROM orders;
            SQL
        )
        return results.map do |result|
            if result["receipt_image"] && result["receipt_approved"] === nil && result["retake_receipt"] ===nil && result["payment_type"] === "cash"
                    Unapproved.new({
                            "id" => result["id"],
                            "driver_id" => result["driver_id"],
                            "restaurant_id" => result["restaurant_id"],
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



# INSERT INTO orders (driver_id, restaurant_id, order_time, customer_address, order_subtotal, payment_type, tip_type, dropoff_time, receipt_image, submitted_tip, receipt_approved, retake_receipt, no_tip, cash_tip) VALUES (1,1,'2018-04-25 10:13:11','8855 E Nebraska Pl, Denver, CO',45,'online','online','2018-04-25 10:50:10',NULL,5,NULL,NULL,NULL,NULL);
