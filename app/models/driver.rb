class Driver
    # ==================================================
    #                      SET UP
    # ==================================================
    attr_reader :id, :first_name, :last_name

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'chop_chop')

    def initialize(opts = {})
        @id = opts["id"].to_i
        @first_name = opts["first_name"]
        @last_name = opts["last_name"]
    end

    # ==================================================
    #                      ROUTES
    # ==================================================

    #get all (index)
    def self.all
        results = DB.exec(
            <<-SQL
                SELECT * FROM drivers;
            SQL
        )
        return results.map { |result| Driver.new(result) }
    end

end
