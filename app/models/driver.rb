class Driver

    # attribute readers for instance access
    attr_accessor :orders, :shifts, :restaurant_id, :total_deliveries, :total_shifts, :delivery_fees, :tips_collected, :ten_percent_of_sales, :owed_by_restaurant, :avg_pu_do_time_mins, :actual_tips_collected, :total_time_worked, :hourly_wage_at_17hr, :est_cash_tips_collected, :avg_del_per_hour, :supplement

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    # initialize options hash
    def initialize opts
        @id = opts["id"].to_f
        @first_name = opts["first_name"]
        @last_name = opts["last_name"]
        @total_deliveries = opts["total_deliveries"].to_f
        @total_shifts = opts["total_shifts"].to_f
        @total_time_worked = opts["total_time_worked"].to_f
        @avg_del_per_hour = opts["avg_del_per_hour"].to_f
        @avg_pu_do_time_mins = opts["avg_pu_do_time_mins"].to_f
        @hourly_wage_at_17hr = opts["hourly_wage_at_17hr"].to_f
        @actual_tips_collected = opts["actual_tips_collected"].to_f
        @est_cash_tips_collected = opts["est_cash_tips_collected"].to_f
        @supplement = opts["supplement"].to_f
        @orders = opts["orders"]
        @shifts = opts["shifts"]
    end

    # GET ROUTES
    # get all driver statistics by day
    def self.driversDay
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        drivers.*,
                        drivers.id AS drivers_id,
                        shifts.*,
                        shifts.id AS shifts_id
                FROM orders
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                LEFT JOIN shifts
                    ON  drivers.id = shifts.id
                WHERE shifts.start_time > '05-01-18'
                    AND shifts.start_time < '05-03-18'
                    AND orders.dropoff_at > '05-01-18'
                    AND orders.dropoff_at < '05-03-18'
            SQL
        )
        drivers = []
        shifts = []
        pu_do_times = []
        actual_tips = []
        cash_tips = []
        current_driver_id = nil
        current_shift_id = nil
        results.each do |result|
            if result["drivers_id"] === current_driver_id
                drivers.last.orders.push(
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
                drivers.last.total_deliveries = drivers.last.orders.length
                # sets avg_pu_do_time_mins
                pu_do_times.push(drivers.last.orders.last.pu_do_time)
                drivers.last.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / drivers.last.total_deliveries)
                # sets actual_tips_collected
                actual_tips.push(drivers.last.orders.last.submitted_tip)
                drivers.last.actual_tips_collected = actual_tips.reduce(0, :+)
                # sets est_cash_tips_collected
                if drivers.last.orders.last.payment_type === 'cash' || drivers.last.orders.last.tip_type === 'cash' || drivers.last.orders.last.cash_tip != nil
                    cash_tips.push(1.00)
                    drivers.last.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                end
                # sets supplement
                drivers.last.supplement = drivers.last.hourly_wage_at_17hr - (drivers.last.actual_tips_collected + drivers.last.est_cash_tips_collected)
                # sets avg_del_per_hour
                drivers.last.avg_del_per_hour = drivers.last.total_deliveries / drivers.last.total_time_worked
            elsif result["driver_id"] != current_driver_id
                current_driver_id = result["driver_id"]
                pu_do_times = []
                actual_tips = []
                cash_tips = []
                driver = Driver.new({
                    "id" => result["id"],
                    "first_name" => result["first_name"],
                    "last_name" => result["last_name"],
                    "total_deliveries" => result["total_deliveries"],
                    "avg_del_per_hour" => result["avg_del_per_hour"],
                    "avg_pu_do_time_mins" => result["avg_pu_do_time_mins"],
                    "hourly_wage_at_17hr" => result["hourly_wage_at_17hr"],
                    "actual_tips_collected" => result["actual_tips_collected"],
                    "est_cash_tips_collected" => result["est_cash_tips_collected"],
                    "supplement" => result["supplement"],
                    "shifts" => [],
                    "orders" => []
                })
                driver.orders.push(
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
                driver.total_deliveries = driver.orders.length
                # sets avg_pu_do_time_mins
                driver.orders.each do |order|
                    pu_do_times.push(order.pu_do_time)
                    driver.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / driver.total_deliveries)
                end
                # sets actual_tips_collected
                driver.orders.each do |order|
                    actual_tips.push(order.submitted_tip)
                    driver.actual_tips_collected = actual_tips.reduce(0, :+)
                end
                # sets est_cash_tips_collected
                driver.orders.each do |order|
                    if order.payment_type === 'cash' || order.tip_type === 'cash' || order.cash_tip != nil
                        cash_tips.push(1.00)
                        driver.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                    end
                end
                # sets supplement
                driver.supplement = driver.hourly_wage_at_17hr - (driver.actual_tips_collected + driver.est_cash_tips_collected)
                # sets avg_del_per_hour
                driver.avg_del_per_hour = (driver.total_deliveries / driver.total_time_worked)

                drivers.push(driver)
            end

            if result["shift_id"] != current_shift_id
                current_shift_id = result["shift_id"]
                time_worked = []
                drivers.last.shifts.push(
                    Shift.new({
                        "id" => result["shifts_id"],
                        "driver_id" => result["driver_id"],
                        "start_time" => result["start_time"],
                        "end_time" => result["end_time"],
                        "total_shift_time_in_min" => result["total_shift_time_in_min"]
                    })
                )
                # sets total_shifts
                drivers.last.total_shifts = drivers.last.shifts.length
                # sets total_time_worked
                driver.shifts.each do |shift|
                    time_worked.push(shift.total_shift_time_in_min)
                    driver.total_time_worked = time_worked.reduce(0, :+) / 60
                end
                # sets hourly_wage_at_17hr
                drivers.last.hourly_wage_at_17hr = drivers.last.total_time_worked * 17
            end
        end
        return drivers
    end
    # get all driver statistics by week
    def self.driversWeek
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        drivers.*,
                        drivers.id AS drivers_id,
                        shifts.*,
                        shifts.id AS shifts_id
                FROM orders
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                LEFT JOIN shifts
                    ON  drivers.id = shifts.id
                WHERE shifts.start_time > '04-30-18'
                    AND shifts.start_time < '05-06-18'
                    AND orders.dropoff_at > '04-30-18'
                    AND orders.dropoff_at < '05-06-18'
            SQL
        )
        drivers = []
        shifts = []
        pu_do_times = []
        actual_tips = []
        cash_tips = []
        current_driver_id = nil
        current_shift_id = nil
        results.each do |result|
            if result["drivers_id"] === current_driver_id
                drivers.last.orders.push(
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
                drivers.last.total_deliveries = drivers.last.orders.length
                # sets avg_pu_do_time_mins
                pu_do_times.push(drivers.last.orders.last.pu_do_time)
                drivers.last.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / drivers.last.total_deliveries)
                # sets actual_tips_collected
                actual_tips.push(drivers.last.orders.last.submitted_tip)
                drivers.last.actual_tips_collected = actual_tips.reduce(0, :+)
                # sets est_cash_tips_collected
                if drivers.last.orders.last.payment_type === 'cash' || drivers.last.orders.last.tip_type === 'cash' || drivers.last.orders.last.cash_tip != nil
                    cash_tips.push(1.00)
                    drivers.last.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                end
                # sets supplement
                drivers.last.supplement = drivers.last.hourly_wage_at_17hr - (drivers.last.actual_tips_collected + drivers.last.est_cash_tips_collected)
                # sets avg_del_per_hour
                drivers.last.avg_del_per_hour = drivers.last.total_deliveries / drivers.last.total_time_worked
            elsif result["driver_id"] != current_driver_id
                current_driver_id = result["driver_id"]
                pu_do_times = []
                actual_tips = []
                cash_tips = []
                driver = Driver.new({
                    "id" => result["id"],
                    "first_name" => result["first_name"],
                    "last_name" => result["last_name"],
                    "total_deliveries" => result["total_deliveries"],
                    "avg_del_per_hour" => result["avg_del_per_hour"],
                    "avg_pu_do_time_mins" => result["avg_pu_do_time_mins"],
                    "hourly_wage_at_17hr" => result["hourly_wage_at_17hr"],
                    "actual_tips_collected" => result["actual_tips_collected"],
                    "est_cash_tips_collected" => result["est_cash_tips_collected"],
                    "supplement" => result["supplement"],
                    "shifts" => [],
                    "orders" => []
                })
                driver.orders.push(
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
                driver.total_deliveries = driver.orders.length
                # sets avg_pu_do_time_mins
                driver.orders.each do |order|
                    pu_do_times.push(order.pu_do_time)
                    driver.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / driver.total_deliveries)
                end
                # sets actual_tips_collected
                driver.orders.each do |order|
                    actual_tips.push(order.submitted_tip)
                    driver.actual_tips_collected = actual_tips.reduce(0, :+)
                end
                # sets est_cash_tips_collected
                driver.orders.each do |order|
                    if order.payment_type === 'cash' || order.tip_type === 'cash' || order.cash_tip != nil
                        cash_tips.push(1.00)
                        driver.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                    end
                end
                # sets supplement
                driver.supplement = driver.hourly_wage_at_17hr - (driver.actual_tips_collected + driver.est_cash_tips_collected)
                # sets avg_del_per_hour
                driver.avg_del_per_hour = (driver.total_deliveries / driver.total_time_worked)

                drivers.push(driver)
            end

            if result["shift_id"] != current_shift_id
                current_shift_id = result["shift_id"]
                time_worked = []
                drivers.last.shifts.push(
                    Shift.new({
                        "id" => result["shifts_id"],
                        "driver_id" => result["driver_id"],
                        "start_time" => result["start_time"],
                        "end_time" => result["end_time"],
                        "total_shift_time_in_min" => result["total_shift_time_in_min"]
                    })
                )
                # sets total_shifts
                drivers.last.total_shifts = drivers.last.shifts.length
                # sets total_time_worked
                driver.shifts.each do |shift|
                    time_worked.push(shift.total_shift_time_in_min)
                    driver.total_time_worked = time_worked.reduce(0, :+) / 60
                end
                # sets hourly_wage_at_17hr
                drivers.last.hourly_wage_at_17hr = drivers.last.total_time_worked * 17
            end
        end
        return drivers
    end
    # get all driver statistics by month
    def self.driversMonth
        results = DB.exec(
            <<-SQL
                SELECT  orders.*,
                        orders.id AS order_id,
                        drivers.*,
                        drivers.id AS drivers_id,
                        shifts.*,
                        shifts.id AS shifts_id
                FROM orders
                LEFT JOIN drivers
                    ON orders.driver_id = drivers.id
                LEFT JOIN shifts
                    ON  drivers.id = shifts.id
                WHERE shifts.start_time > '04-30-18'
                    AND shifts.start_time < '06-01-18'
                    AND orders.dropoff_at > '04-30-18'
                    AND orders.dropoff_at < '06-01-18'
            SQL
        )
        drivers = []
        shifts = []
        pu_do_times = []
        actual_tips = []
        cash_tips = []
        current_driver_id = nil
        current_shift_id = nil
        results.each do |result|
            if result["drivers_id"] === current_driver_id
                drivers.last.orders.push(
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
                drivers.last.total_deliveries = drivers.last.orders.length
                # sets avg_pu_do_time_mins
                pu_do_times.push(drivers.last.orders.last.pu_do_time)
                drivers.last.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / drivers.last.total_deliveries)
                # sets actual_tips_collected
                actual_tips.push(drivers.last.orders.last.submitted_tip)
                drivers.last.actual_tips_collected = actual_tips.reduce(0, :+)
                # sets est_cash_tips_collected
                if drivers.last.orders.last.payment_type === 'cash' || drivers.last.orders.last.tip_type === 'cash' || drivers.last.orders.last.cash_tip != nil
                    cash_tips.push(1.00)
                    drivers.last.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                end
                # sets supplement
                drivers.last.supplement = drivers.last.hourly_wage_at_17hr - (drivers.last.actual_tips_collected + drivers.last.est_cash_tips_collected)
                # sets avg_del_per_hour
                drivers.last.avg_del_per_hour = drivers.last.total_deliveries / drivers.last.total_time_worked
            elsif result["driver_id"] != current_driver_id
                current_driver_id = result["driver_id"]
                pu_do_times = []
                actual_tips = []
                cash_tips = []
                driver = Driver.new({
                    "id" => result["id"],
                    "first_name" => result["first_name"],
                    "last_name" => result["last_name"],
                    "total_deliveries" => result["total_deliveries"],
                    "avg_del_per_hour" => result["avg_del_per_hour"],
                    "avg_pu_do_time_mins" => result["avg_pu_do_time_mins"],
                    "hourly_wage_at_17hr" => result["hourly_wage_at_17hr"],
                    "actual_tips_collected" => result["actual_tips_collected"],
                    "est_cash_tips_collected" => result["est_cash_tips_collected"],
                    "supplement" => result["supplement"],
                    "shifts" => [],
                    "orders" => []
                })
                driver.orders.push(
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
                driver.total_deliveries = driver.orders.length
                # sets avg_pu_do_time_mins
                driver.orders.each do |order|
                    pu_do_times.push(order.pu_do_time)
                    driver.avg_pu_do_time_mins = (pu_do_times.reduce(0, :+) / driver.total_deliveries)
                end
                # sets actual_tips_collected
                driver.orders.each do |order|
                    actual_tips.push(order.submitted_tip)
                    driver.actual_tips_collected = actual_tips.reduce(0, :+)
                end
                # sets est_cash_tips_collected
                driver.orders.each do |order|
                    if order.payment_type === 'cash' || order.tip_type === 'cash' || order.cash_tip != nil
                        cash_tips.push(1.00)
                        driver.est_cash_tips_collected = cash_tips.reduce(0, :+) * 5
                    end
                end
                # sets supplement
                driver.supplement = driver.hourly_wage_at_17hr - (driver.actual_tips_collected + driver.est_cash_tips_collected)
                # sets avg_del_per_hour
                driver.avg_del_per_hour = (driver.total_deliveries / driver.total_time_worked)

                drivers.push(driver)
            end

            if result["shift_id"] != current_shift_id
                current_shift_id = result["shift_id"]
                time_worked = []
                drivers.last.shifts.push(
                    Shift.new({
                        "id" => result["shifts_id"],
                        "driver_id" => result["driver_id"],
                        "start_time" => result["start_time"],
                        "end_time" => result["end_time"],
                        "total_shift_time_in_min" => result["total_shift_time_in_min"]
                    })
                )
                # sets total_shifts
                drivers.last.total_shifts = drivers.last.shifts.length
                # sets total_time_worked
                driver.shifts.each do |shift|
                    time_worked.push(shift.total_shift_time_in_min)
                    driver.total_time_worked = time_worked.reduce(0, :+) / 60
                end
                # sets hourly_wage_at_17hr
                drivers.last.hourly_wage_at_17hr = drivers.last.total_time_worked * 17
            end
        end
        return drivers
    end
    
end
