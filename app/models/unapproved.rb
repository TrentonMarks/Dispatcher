class Unapproved

    # attribute readers for instance access
    attr_reader :id, :driver_id, :restaurant_id, :order_time, :customer_address, :order_subtotal, :payment_type, :tip_type, :dropoff_time, :receipt_image, :submitted_tip, :receipt_approved, :retake_receipt, :no_tip, :cash_tip

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


    # Routes

    #get all (index)
    def self.all
        results = DB.exec(
            <<-SQL
                SELECT * FROM orders;
            SQL
        )
        return results.map { |result| Unapproved.new result }
    end

end
