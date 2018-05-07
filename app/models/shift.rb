class Shift

    attr_accessor :total_shift_time_in_min

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    def initialize opts
        @id = opts["id"].to_i
        @driver_id = opts["driver_id"].to_i
        @start_time = opts["start_time"]
        @end_time = opts["end_time"]
        @total_shift_time_in_min = (Time.parse(opts["end_time"]) - Time.parse(opts["start_time"])) / 60
    end
end
