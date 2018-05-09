////// STATISTICS TAB ////////
// Nav Bar for Restaurant Statistics
class RestaurantsNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDay = this.getDay.bind(this)
        this.getWeek = this.getWeek.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.state = {
            showingDay: true,
            showingWeek: false,
            showingMonth: false,
            allDay: [],
            allWeek: [],
            allMonth: [],
            day: {},
            week: {},
            month: {}
        }
    }
    componentDidMount(){
        this.getAllDay()
    }
    changeState(st1, st2, st3){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
        {this.state.showingDay ? this.getAllDay() : ''}
        {this.state.showingWeek ? this.getAllWeek() : ''}
        {this.state.showingMonth ? this.getAllMonth() : ''}

    }
    getDay(day){
        this.setState({day: day})
    }
    getWeek(week){
        this.setState({week: week})
    }
    getMonth(month){
        this.setState({month: month})
    }
    getAllDay(){
        fetch('/statistics/restaurants/day')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allDay: data
                })
            }).catch(error => console.log(error))
    }
    getAllWeek(){
        fetch('/statistics/restaurants/week')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allWeek: data
                })
            }).catch(error => console.log(error))
    }
    getAllMonth(){
        fetch('/statistics/restaurants/month')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allMonth: data
                })
            }).catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <ul class="list-reset flex border-b bg-white h-16 items-center">
                            <li class="-mb-px mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>
                            </li>
                            <li class="mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>
                            </li>
                            <li>
                            <button
                                class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

                            </li>

                        </ul>

                    </form>

                    <RestaurantsTable
                        state = {this.state}
                        changeState = {this.changeState}
                    />

                </div>
    }
}
// Data Table for Restaurants Tab
class RestaurantsTable extends React.Component{
    render(){
        return  <table>
                    <tbody>

                        {this.props.state.showingDay ?
                            this.props.state.allDay.map((day, index)=>{
                                return  <div>
                                            <h3>Day</h3>
                                            <tr>
                                                <td>
                                                    <p>Restaurant: <em>{day.name}</em></p>
                                                    <p>Avg PU to DO Time: <em>{day.avg_pu_do_time_mins}</em></p>
                                                    <p>Percent Under 45 mins: <em>{day.percent_under_45_mins}</em></p>
                                                    <p>Avg Delivery Time: <em>{day.avg_delivery_time_mins}</em></p>
                                                    <p>Total Deliveries: <em>{day.total_deliveries}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingWeek ?
                            this.props.state.allWeek.map((week, index)=>{
                                return  <div>
                                            <h3>Week</h3>
                                            <tr>
                                                <td>
                                                    <p>Restaurant: <em>{week.name}</em></p>
                                                    <p>Avg PU to DO Time: <em>{week.avg_pu_do_time_mins}</em></p>
                                                    <p>Percent Under 45 mins: <em>{week.percent_under_45_mins}</em></p>
                                                    <p>Avg Delivery Time: <em>{week.avg_delivery_time_mins}</em></p>
                                                    <p>Total Deliveries: <em>{week.total_deliveries}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingMonth ?
                            this.props.state.allMonth.map((month, index)=>{
                                return  <div>
                                            <h3>Month</h3>
                                            <tr>
                                                <td>
                                                    <p>Restaurant: <em>{month.name}</em></p>
                                                    <p>Avg PU to DO Time: <em>{month.avg_pu_do_time_mins}</em></p>
                                                    <p>Percent Under 45 mins: <em>{month.percent_under_45_mins}</em></p>
                                                    <p>Avg Delivery Time: <em>{month.avg_delivery_time_mins}</em></p>
                                                    <p>Total Deliveries: <em>{month.total_deliveries}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                    </tbody>
                </table>
    }
}
// Nav Bar for Drivers Statistics
class DriversNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDay = this.getDay.bind(this)
        this.getWeek = this.getWeek.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.state = {
            showingDay: true,
            showingWeek: false,
            showingMonth: false,
            allDay: [],
            allWeek: [],
            allMonth: [],
            day: {},
            week: {},
            month: {}
        }
    }
    componentDidMount(){
        this.getAllDay()
    }
    changeState(st1, st2, st3){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
        {this.state.showingDay ? this.getAllDay() : ''}
        {this.state.showingWeek ? this.getAllWeek() : ''}
        {this.state.showingMonth ? this.getAllMonth() : ''}

    }
    getDay(day){
        this.setState({day: day})
    }
    getWeek(week){
        this.setState({week: week})
    }
    getMonth(month){
        this.setState({month: month})
    }
    getAllDay(){
        fetch('/statistics/drivers/day')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allDay: data
                })
            }).catch(error => console.log(error))
    }
    getAllWeek(){
        fetch('/statistics/drivers/week')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allWeek: data
                })
            }).catch(error => console.log(error))
    }
    getAllMonth(){
        fetch('/statistics/drivers/month')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allMonth: data
                })
            }).catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <ul class="list-reset flex border-b bg-white h-16 items-center">
                            <li class="-mb-px mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>
                            </li>
                            <li class="mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>
                            </li>
                            <li>
                            <button
                                class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

                            </li>

                        </ul>

                    </form>

                    <DriversTable
                        state = {this.state}
                        changeState = {this.changeState}
                    />

                </div>
    }
}
// Data Table for Drivers Tab
class DriversTable extends React.Component{
    render(){
        return  <table>
                    <tbody>

                        {this.props.state.showingDay ?
                            this.props.state.allDay.map((day, index)=>{
                                return  <div>
                                            <h3>Day</h3>
                                            <tr>
                                                <td>
                                                    <p> Name: <em>{day.first_name} {day.last_name}</em></p>
                                                    <p>Total Deliveries: <em>{day.total_deliveries}</em></p>
                                                    <p>Total Shifts: <em>{day.total_shifts}</em></p>
                                                    <p>Total Time Worked: <em>{day.total_time_worked}</em></p>
                                                    <p>Avg Delivery Per Hour: <em>{day.avg_del_per_hour}</em></p>
                                                    <p>Avg PU DO Time: <em>{day.avg_pu_do_time_mins}</em></p>
                                                    <p>Hourly Wage at $17/hr: <em>{day.hourly_wage_at_17hr}</em></p>
                                                    <p>Actual Tips: <em>{day.actual_tips_collected}</em></p>
                                                    <p>Estimated Cash Tips: <em>{day.est_cash_tips_collected}</em></p>
                                                    <p>Supplement: <em>{day.supplement}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingWeek ?
                            this.props.state.allWeek.map((week, index)=>{
                                return  <div>
                                            <h3>Week</h3>
                                            <tr>
                                                <td>
                                                    <p> Name: <em>{week.first_name} {week.last_name}</em></p>
                                                    <p>Total Deliveries: <em>{week.total_deliveries}</em></p>
                                                    <p>Total Shifts: <em>{week.total_shifts}</em></p>
                                                    <p>Total Time Worked: <em>{week.total_time_worked}</em></p>
                                                    <p>Avg Delivery Per Hour: <em>{week.avg_del_per_hour}</em></p>
                                                    <p>Avg PU DO Time: <em>{week.avg_pu_do_time_mins}</em></p>
                                                    <p>Hourly Wage at $17/hr: <em>{week.hourly_wage_at_17hr}</em></p>
                                                    <p>Actual Tips: <em>{week.actual_tips_collected}</em></p>
                                                    <p>Estimated Cash Tips: <em>{week.est_cash_tips_collected}</em></p>
                                                    <p>Supplement: <em>{week.supplement}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingMonth ?
                            this.props.state.allMonth.map((month, index)=>{
                                return  <div>
                                            <h3>Month</h3>
                                            <tr>
                                                <td>
                                                    <p> Name: <em>{month.first_name} {month.last_name}</em></p>
                                                    <p>Total Deliveries: <em>{month.total_deliveries}</em></p>
                                                    <p>Total Shifts: <em>{month.total_shifts}</em></p>
                                                    <p>Total Time Worked: <em>{month.total_time_worked}</em></p>
                                                    <p>Avg Delivery Per Hour: <em>{month.avg_del_per_hour}</em></p>
                                                    <p>Avg PU DO Time: <em>{month.avg_pu_do_time_mins}</em></p>
                                                    <p>Hourly Wage at $17/hr: <em>{month.hourly_wage_at_17hr}</em></p>
                                                    <p>Actual Tips: <em>{month.actual_tips_collected}</em></p>
                                                    <p>Estimated Cash Tips: <em>{month.est_cash_tips_collected}</em></p>
                                                    <p>Supplement: <em>{month.supplement}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                    </tbody>
                </table>
    }
}
// Nav Bar for Head StatisticsNav
class HeadNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDay = this.getDay.bind(this)
        this.getWeek = this.getWeek.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.state = {
            showingDay: true,
            showingWeek: false,
            showingMonth: false,
            allDay: [],
            allWeek: [],
            allMonth: [],
            day: {},
            week: {},
            month: {}
        }
    }
    componentDidMount(){
        this.getAllDay()
    }
    changeState(st1, st2, st3){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
        {this.state.showingDay ? this.getAllDay() : ''}
        {this.state.showingWeek ? this.getAllWeek() : ''}
        {this.state.showingMonth ? this.getAllMonth() : ''}

    }
    getDay(day){
        this.setState({day: day})
    }
    getWeek(week){
        this.setState({week: week})
    }
    getMonth(month){
        this.setState({month: month})
    }
    getAllDay(){
        fetch('/statistics/head/day')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allDay: data
                })
            }).catch(error => console.log(error))
    }
    getAllWeek(){
        fetch('/statistics/head/week')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allWeek: data
                })
            }).catch(error => console.log(error))
    }
    getAllMonth(){
        fetch('/statistics/head/month')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allMonth: data
                })
            }).catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                    <ul class="list-reset flex border-b bg-white h-16 items-center">
                        <li class="-mb-px mr-1">
                            <button
                                class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>
                        </li>
                        <li class="mr-1">
                            <button
                                class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>
                        </li>
                        <li>
                        <button
                            class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                            onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

                        </li>

                    </ul>

                    </form>

                    <HeadTable
                        state = {this.state}
                        changeState = {this.changeState}
                    />

                </div>
    }
}
// Data Table for Head Tab
class HeadTable extends React.Component{
    render(){
        return  <table>
                    <tbody>

                        {this.props.state.showingDay ?
                            this.props.state.allDay.map((day, index)=>{
                                return  <div>
                                            <h3>Day</h3>
                                            <tr>
                                                <td>
                                                    <p> Restaurant Name: <em>{day.name}</em></p>
                                                    <p>Total Deliveries: <em>{day.total_deliveries}</em></p>
                                                    <p>Delivery Fees: <em>{day.delivery_fees}</em></p>
                                                    <p>Tips Collected: <em>{day.tips_collected}</em></p>
                                                    <p>10% of Sales: <em>{day.ten_percent_of_sales}</em></p>
                                                    <p>Amount Owed by Restaurant: <em>{day.owed_by_restaurant}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingWeek ?
                            this.props.state.allWeek.map((week, index)=>{
                                return  <div>
                                            <h3>Week</h3>
                                            <tr>
                                                <td>
                                                    <p> Restaurant Name: <em>{week.name}</em></p>
                                                    <p>Total Deliveries: <em>{week.total_deliveries}</em></p>
                                                    <p>Delivery Fees: <em>{week.delivery_fees}</em></p>
                                                    <p>Tips Collected: <em>{week.tips_collected}</em></p>
                                                    <p>10% of Sales: <em>{week.ten_percent_of_sales}</em></p>
                                                    <p>Amount Owed by Restaurant: <em>{week.owed_by_restaurant}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {this.props.state.showingMonth ?
                            this.props.state.allMonth.map((month, index)=>{
                                return  <div>
                                            <h3>Month</h3>
                                            <tr>
                                                <td>
                                                    <p> Restaurant Name: <em>{month.name}</em></p>
                                                    <p>Total Deliveries: <em>{month.total_deliveries}</em></p>
                                                    <p>Delivery Fees: <em>{month.delivery_fees}</em></p>
                                                    <p>Tips Collected: <em>{month.tips_collected}</em></p>
                                                    <p>10% of Sales: <em>{month.ten_percent_of_sales}</em></p>
                                                    <p>Amount Owed by Restaurant: <em>{month.owed_by_restaurant}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }

                    </tbody>
                </table>
    }
}
// Restaurants/Drivers/Head Statistics Nav Bar
class StatisticsNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.state = {
            showingRestaurants: true,
            showingDrivers: false,
            showingHead: false
        }

    }
    changeState(st1, st2, st3){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false
        })
    }
    render(){
        return  <div>

                    {this.state.showingRestaurants ?

                        <div>

                            <ul class="list-reset flex border-b bg-white">
                                <li class="-mb-px mr-1">
                                    <button
                                        class="bg-grey-light inline-block border-b-2 border-teal-light rounded-t py-2 px-4 text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingRestaurants', 'showingDrivers', 'showingHead')
                                        }}
                                    >Restaurants</button>
                                </li>
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingDrivers', 'showingRestaurants', 'showingHead')
                                        }}
                                    >Drivers</button>
                                </li>
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingHead', 'showingRestaurants', 'showingDrivers')
                                        }}
                                    >Head</button>
                                </li>
                            </ul>

                            <RestaurantsNav state={this.state} />

                        </div>

                    : ''}

                    {this.state.showingDrivers ?

                        <div>

                            <ul class="list-reset flex border-b bg-white">
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingRestaurants', 'showingDrivers', 'showingHead')
                                        }}
                                    >Restaurants</button>
                                </li>
                                <li class="-mb-px mr-1">
                                    <button
                                        class="bg-grey-light inline-block border-b-2 border-teal-light rounded-t py-2 px-4 text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingDrivers', 'showingRestaurants', 'showingHead')
                                        }}
                                    >Drivers</button>
                                </li>
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingHead', 'showingRestaurants', 'showingDrivers')
                                        }}
                                    >Head</button>
                                </li>
                            </ul>

                            <DriversNav state={this.state} />

                        </div>

                    : ''}

                    {this.state.showingHead ?

                        <div>

                            <ul class="list-reset flex border-b bg-white">
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingRestaurants', 'showingDrivers', 'showingHead')
                                        }}
                                    >Restaurants</button>
                                </li>
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingDrivers', 'showingRestaurants', 'showingHead')
                                        }}
                                    >Drivers</button>
                                </li>
                                <li class="-mb-px mr-1">
                                    <button
                                        class="bg-grey-light inline-block border-b-2 border-teal-light rounded-t py-2 px-4 text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingHead', 'showingRestaurants', 'showingDrivers')
                                        }}
                                    >Head</button>
                                </li>
                            </ul>

                                <HeadNav state={this.state} />

                        </div>

                    : ''}

                </div>
    }
}


////// RECEIPTS TAB ////////
// Nav Bar for Credit Card, Online, Cash Approved Receipts
class AppNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCreditCard = this.getCreditCard.bind(this)
        this.getOnline = this.getOnline.bind(this)
        this.getCash = this.getCash.bind(this)
        this.getReceipt = this.getReceipt.bind(this)
        this.assignAsUnapproved = this.assignAsUnapproved.bind(this)
        this.state = {
            showingCredit: true,
            showingOnline: false,
            showingCash: false,
            showingReceipt: false,
            allCredit: [],
            allOnline: [],
            allCash: [],
            receiptById: [],
            creditcard: {},
            online: {},
            cash: {},
            receipt: {}
        }
    }
    componentDidMount(){
        this.getAllCredit()
    }
    changeState(st1, st2, st3, st4, st5){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false,
            [st4]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
        {this.state.showingCredit ? this.getAllCredit() : ''}
        {this.state.showingOnline ? this.getAllOnline() : ''}
        {this.state.showingCash ? this.getAllCash() : ''}
    }
    getCreditCard(creditcard){
        this.setState({creditcard: creditcard})
    }
    getOnline(online){
        this.setState({online: online})
    }
    getCash(cash){
        this.setState({cash: cash})
    }
    getReceipt(receipt){
        this.setState({receipt: receipt})
    }
    getAllCredit(){
        fetch('/receipts/approved/creditcard')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCredit: data
                })
            }).catch(error => console.log(error))
    }
    getAllOnline(){
        fetch('/receipts/approved/online')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allOnline: data
                })
            }).catch(error => console.log(error))
    }
    getAllCash(){
        fetch('/receipts/approved/cash')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCash: data
                })
            }).catch(error => console.log(error))
    }
    assignAsUnapproved(receipt){
        fetch('/receipts/approved/' + receipt.id + '/unapprove', {
            body: JSON.stringify(receipt),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'
            }
        })
        .then(updatedReceipt => {
            return updatedReceipt.json()
        })
        .then(jsonedReceipt => {
            this.getAllCredit()
            this.changeState('showingCredit', 'showingReceipt', 'showingOnline', 'showingCash')
        })
        .catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <ul class="list-reset flex border-b bg-white h-16 items-center">
                            <li class="-mb-px mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingReceipt')}>Credit Card</button>
                            </li>
                            <li class="mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingReceipt')}>Online</button>
                            </li>
                            <li>
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingReceipt')}>Cash</button>
                            </li>

                        </ul>

                    </form>

                    <AppTable
                        state = {this.state}
                        changeState = {this.changeState}
                        getReceipt = {this.getReceipt}
                        assignAsUnapproved = {this.assignAsUnapproved}
                    />

                </div>
    }
}
// Data Table for Approved CC, Online, and Cash Receipts
class AppTable extends React.Component{
    render(){
        return  <table class="text-left m-4">
                    <thead>
                        <tr class="bg-white font-sans font-medium text-sm text-grey-dark text-center">
                            <th class="py-4 px-6 border-b border-grey-light">ID</th>
                            <th class="py-4 px-6 border-b border-grey-light">Restaurant</th>
                            <th class="py-4 px-6 border-b border-grey-light">Ordered At</th>
                            <th class="py-4 px-6 border-b border-grey-light">Subtotal</th>
                            <th class="py-4 px-6 border-b border-grey-light">Tip</th>
                            <th class="py-4 px-6 border-b border-grey-light">Driver</th>
                            <th class="py-4 px-6 border-b border-grey-light">Receipt Image</th>
                        </tr>
                    </thead>


                    {this.props.state.showingCredit ?
                        this.props.state.allCredit.map((creditcard, index)=>{
                            return  <tbody>
                                        <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.id}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.ordered_at}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.order_subtotal}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.submitted_tip}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{creditcard.first_name} {creditcard.last_name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light"><button
                                                class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                onClick={()=>{
                                                    this.props.getReceipt(creditcard)
                                                    this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                }}>View</button></td>
                                        </tr>
                                    </tbody>
                        }) : ''
                    }
                        {
                            this.props.state.showingOnline ?
                            this.props.state.allOnline.map((online, index)=>{
                                return  <tbody>
                                            <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                <td class="py-4 px-6 border-b border-grey-light">{online.id}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{online.name}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{online.ordered_at}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{online.order_subtotal}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{online.submitted_tip}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{online.first_name} {online.last_name}</td>
                                                <td class="py-4 px-6 border-b border-grey-light"><button
                                                    class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                    onClick={()=>{
                                                        this.props.getReceipt(online)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                    }}>View</button></td>
                                            </tr>
                                        </tbody>
                            }) : ''
                        }
                        {
                            this.props.state.showingCash ?
                            this.props.state.allCash.map((cash, index)=>{
                                return  <tbody>
                                            <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.id}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.name}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.ordered_at}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.order_subtotal}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.submitted_tip}</td>
                                                <td class="py-4 px-6 border-b border-grey-light">{cash.first_name} {cash.last_name}</td>
                                                <td class="py-4 px-6 border-b border-grey-light"><button
                                                    class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                    onClick={()=>{
                                                        this.props.getReceipt(cash)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                    }}>View</button></td>
                                            </tr>
                                        </tbody>
                            }) : ''
                        }
                        {
                            this.props.state.showingReceipt ?
                                <tbody>
                                        <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.id}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.ordered_at}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.order_subtotal}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.submitted_tip}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.first_name} {this.props.state.receipt.last_name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light"><button
                                                class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                                                onClick={()=>{this.props.assignAsUnapproved(this.props.state.receipt)}}>Unapprove</button></td>
                                        </tr>
                                    </tbody>
                                 : ''
                        }

                </table>

    }
}
// Nav Bar for Credit Card, Online, Cash, and Retake Unapproved Receipts
class UnappNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCreditCard = this.getCreditCard.bind(this)
        this.getOnline = this.getOnline.bind(this)
        this.getCash = this.getCash.bind(this)
        this.getRetake = this.getRetake.bind(this)
        this.getReceipt = this.getReceipt.bind(this)
        this.assignAsRetake = this.assignAsRetake.bind(this)
        this.assignAsApproved = this.assignAsApproved.bind(this)
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
        this.state = {
            showingCredit: true,
            showingOnline: false,
            showingCash: false,
            showingRetake: false,
            showingReceipt: false,
            showingEditForm: false,
            allCredit: [],
            allOnline: [],
            allCash: [],
            allRetake: [],
            receiptById: [],
            creditcard: {},
            online: {},
            cash: {},
            retake: {},
            receipt: {}
        }
    }
    componentDidMount(){
        this.getAllCredit()
    }
    changeState(st1, st2, st3, st4, st5, st6){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false,
            [st4]: false,
            [st5]: false,
            [st6]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
        {this.state.showingCredit ? this.getAllCredit() : ''}
        {this.state.showingOnline ? this.getAllOnline() : ''}
        {this.state.showingCash ? this.getAllCash() : ''}
        {this.state.showingRetake ? this.getAllRetake() : ''}
    }
    getCreditCard(creditcard){
        this.setState({creditcard: creditcard})
    }
    getOnline(online){
        this.setState({online: online})
    }
    getCash(cash){
        this.setState({cash: cash})
    }
    getRetake(retake){
        this.setState({retake: retake})
    }
    getReceipt(receipt){
        this.setState({receipt: receipt})
    }
    getAllCredit(){
        fetch('/receipts/unapproved/creditcard')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCredit: data
                })
            }).catch(error => console.log(error))
    }
    getAllOnline(){
        fetch('/receipts/unapproved/online')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allOnline: data
                })
            }).catch(error => console.log(error))
    }
    getAllCash(){
        fetch('/receipts/unapproved/cash')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCash: data
                })
            }).catch(error => console.log(error))
    }
    getAllRetake(){
        fetch('/receipts/unapproved/retake')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allRetake: data
                })
            }).catch(error => console.log(error))
    }
    assignAsRetake(receipt){
        fetch('/receipts/unapproved/' + receipt.id + '/retake', {
            body: JSON.stringify(receipt),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'
            }
        })
        .then(updatedReceipt => {
            return updatedReceipt.json()
        })
        .then(jsonedReceipt => {
            this.getAllRetake()
            this.changeState('showingRetake', 'showingReceipt','showingCredit', 'showingOnline', 'showingCash')
        })
        .catch(error => console.log(error))
    }
    assignAsApproved(receipt){
        fetch('/receipts/unapproved/' + receipt.id + '/approve', {
            body: JSON.stringify(receipt),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'
            }
        })
        .then(updatedReceipt => {
            return updatedReceipt.json()
        })
        .then(jsonedReceipt => {
            this.getAllCredit()
            this.changeState('showingCredit', 'showingReceipt','showingRetake', 'showingOnline', 'showingCash')
        })
        .catch(error => console.log(error))
    }
    handleUpdateSubmit(receipt){
        fetch('/receipts/unapproved/' + receipt.id + '/edit', {
            body: JSON.stringify(receipt),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(updatedReceipt => {
            return updatedReceipt.json()
        })
        .then(jsonedReceipt => {
            this.getAllCredit()
            this.changeState('showingCredit', 'showingEditForm')
        })
        .catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <ul class="list-reset flex border-b bg-white h-16 items-center">
                            <li class="-mb-px mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Credit Card</button>
                            </li>
                            <li class="mr-1">
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Online</button>
                            </li>
                            <li>
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-2 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Cash</button>
                            </li>
                            <li>
                                <button
                                    class="bg-white border border-grey hover:text-grey-lightest hover:border-teal-dark hover:bg-teal text-grey-dark ml-3 py-2 px-4 rounded"
                                    onClick={()=>this.changeState('showingRetake', 'showingCredit', 'showingOnline', 'showingCash', 'showingReceipt', 'showingEditForm')}>Retake</button>
                            </li>
                        </ul>

                    </form>

                    <UnappTable
                        state = {this.state}
                        receipt = {this.state.receipt}
                        changeState = {this.changeState}
                        getReceipt = {this.getReceipt}
                        assignAsRetake = {this.assignAsRetake}
                        assignAsApproved = {this.assignAsApproved}
                        handleUpdateSubmit = {this.handleUpdateSubmit}
                    />

                </div>
    }
}
// Data Table for Unapproved CC, Online, Cash, and Retake Receipts
class UnappTable extends React.Component{
    render(){
        return  <table class="text-left m-4">
                    <thead>
                        <tr class="bg-white font-sans font-medium text-sm text-grey-dark text-center">
                            <th class="py-4 px-6 border-b border-grey-light">ID</th>
                            <th class="py-4 px-6 border-b border-grey-light">Restaurant</th>
                            <th class="py-4 px-6 border-b border-grey-light">Ordered At</th>
                            <th class="py-4 px-6 border-b border-grey-light">Subtotal</th>
                            <th class="py-4 px-6 border-b border-grey-light">Tip</th>
                            <th class="py-4 px-6 border-b border-grey-light">Driver</th>
                            <th class="py-4 px-6 border-b border-grey-light">Receipt Image</th>
                        </tr>
                    </thead>

                            {
                                this.props.state.showingCredit ?
                                this.props.state.allCredit.map((creditcard, index)=>{
                                    return  <tbody>
                                                <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.id}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.ordered_at}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.order_subtotal}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.submitted_tip}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{creditcard.first_name} {creditcard.last_name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light"><button
                                                        class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                        onClick={()=>{
                                                            this.props.getReceipt(creditcard)
                                                            this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                        }}>View</button></td>
                                                </tr>
                                            </tbody>
                                }) : ''
                            }
                            {
                                this.props.state.showingOnline ?
                                this.props.state.allOnline.map((online, index)=>{
                                    return  <tbody>
                                                <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.id}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.ordered_at}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.order_subtotal}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.submitted_tip}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{online.first_name} {online.last_name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light"><button
                                                        class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                        onClick={()=>{
                                                            this.props.getReceipt(online)
                                                            this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                        }}>View</button></td>
                                                </tr>
                                            </tbody>
                                }) : ''
                            }
                            {
                                this.props.state.showingCash ?
                                this.props.state.allCash.map((cash, index)=>{
                                    return  <tbody>
                                                <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.id}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.ordered_at}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.order_subtotal}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.submitted_tip}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{cash.first_name} {cash.last_name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light"><button
                                                        class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                        onClick={()=>{
                                                            this.props.getReceipt(cash)
                                                            this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                        }}>View</button></td>
                                                </tr>
                                            </tbody>
                                }) : ''
                            }
                            {
                                this.props.state.showingRetake ?
                                this.props.state.allRetake.map((retake, index)=>{
                                    return  <tbody>
                                                <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.id}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.ordered_at}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.order_subtotal}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.submitted_tip}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light">{retake.first_name} {retake.last_name}</td>
                                                    <td class="py-4 px-6 border-b border-grey-light"><button
                                                        class="bg-teal-light border border-teal text-white hover:bg-teal hover:border-teal-dark  hover:text-grey-lightest py-2 px-4 rounded"
                                                        onClick={()=>{
                                                            this.props.getReceipt(retake)
                                                            this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                        }}>View</button></td>
                                                </tr>
                                            </tbody>
                                }) : ''
                            }
                            {
                                this.props.state.showingReceipt ?
                                    <tbody>
                                        <tr class="bg-white font-sans font-light text-sm text-grey-dark text-center hover:bg-blue-lightest">
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.id}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.ordered_at}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.order_subtotal}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.submitted_tip}</td>
                                            <td class="py-4 px-6 border-b border-grey-light">{this.props.state.receipt.first_name} {this.props.state.receipt.last_name}</td>
                                            <td class="py-4 px-6 border-b border-grey-light"><button
                                                class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                                                onClick={()=>{this.props.assignAsRetake(this.props.state.receipt)}}>Retake</button></td>
                                            <td class="py-4 px-6 border-b border-grey-light"><button
                                                class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                                                onClick={()=>{
                                                this.props.changeState('showingEditForm', 'showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                                }}>Edit</button></td>
                                            <td class="py-4 px-6 border-b border-grey-light"><button
                                                class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                                                onClick={()=>{this.props.assignAsApproved(this.props.state.receipt)}}>Approve</button></td>
                                        </tr>
                                    </tbody> : ''
                            }
                            {
                                this.props.state.showingEditForm ?
                                    <div>
                                        <EditForm
                                        changeState = {this.props.changeState}
                                        handleUpdateSubmit = {this.props.handleUpdateSubmit}
                                        receipt = {this.props.receipt}
                                        />
                                    </div> : ''
                            }
                </table>
    }
}
// Form Within Show-Page to Edit Submitted Receipts
class EditForm extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            customer_address: '',
            order_subtotal: 0,
            payment_type: '',
            tip_type: '',
            receipt_image: '',
            submitted_tip: 0,
            no_tip: false,
            cash_tip: false
        }
    }
    componentDidMount(){
        if(this.props.receipt){
            this.setState({
                id: this.props.receipt.id,
                customer_address: this.props.receipt.customer_address,
                order_subtotal: this.props.receipt.order_subtotal,
                payment_type: this.props.receipt.payment_type,
                tip_type: this.props.receipt.tip_type,
                receipt_image: this.props.receipt.receipt_image,
                submitted_tip: this.props.receipt.submitted_tip,
                no_tip: this.props.receipt.no_tip,
                cash_tip: this.props.receipt.cash_tip
            })
        }
    }
    handleChange(event){
        this.setState({ [event.target.id]: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.handleUpdateSubmit(this.state)
    }
    render(){
        return  <div>
                    <form onSubmit={this.handleSubmit}>

                        <label for='customer_address'>Customer Address</label>
                        <input
                            type='text'
                            id='customer_address'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.customer_address}
                        />

                        <label for='order_subtotal'>Order Subtotal</label>
                        <input
                            type='text'
                            id='order_subtotal'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.order_subtotal}
                        />

                        <label for='payment_type'>Payment Type</label>
                        <input
                            type='text'
                            id='payment_type'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.payment_type}
                        />

                        <label for='tip_type'>Tip Type</label>
                        <input
                            type='text'
                            id='tip_type'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.tip_type}
                        />

                        <label for='receipt_image'>Receipt Image</label>
                        <input
                            type='text'
                            id='receipt_image'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.receipt_image}
                        />

                        <label for='submitted_tip'>Submitted Tip</label>
                        <input
                            type='text'
                            id='submitted_tip'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.submitted_tip}
                        />

                        <label for='no_tip'>No Tip</label>
                        <input
                            type='text'
                            id='no_tip'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.no_tip}
                        />

                        <label for='cash_tip'>Cash Tip</label>
                        <input
                            type='text'
                            id='cash_tip'
                            onChange={this.handleChange}
                            placeholder={this.props.receipt.cash_tip}
                        />

                        <input
                            class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                            type='submit' />

                        <button
                            class="bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded"
                            onClick={()=>this.props.changeState('showingCredit', 'showingEditForm')}>Cancel
                        </button>

                    </form>
                </div>
    }
}
// Approved/Unapproved Receipts Nav Bar
class ReceiptsNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.state = {
            showingUnapproved: true,
            showingApproved: false
        }
    }
    changeState(st1, st2){
        this.setState({
            [st1]: true,
            [st2]: false
        })
    }
    render(){
        return  <div>

                    {this.state.showingUnapproved ?

                        <div>

                            <ul class="list-reset flex border-b bg-white">
                                <li class="-mb-px mr-1">
                                    <button
                                        class="bg-grey-lighter inline-block border-b-2 border-teal-light rounded-t py-2 px-4 text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingUnapproved', 'showingApproved')
                                        }}
                                    >Unapproved</button>
                                </li>
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingApproved', 'showingUnapproved')
                                        }}
                                    >Approved</button>
                                </li>
                            </ul>

                            <UnappNav />

                        </div>

                    : ''}

                    {this.state.showingApproved ?

                        <div>

                            <ul class="list-reset flex border-b bg-white">
                                <li class="mr-1">
                                    <button
                                        class="bg-white inline-block py-2 px-4 text-grey-dark hover:text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingUnapproved', 'showingApproved')
                                        }}
                                    >Unapproved</button>
                                </li>
                                <li class="-mb-px mr-1">
                                    <button
                                        class="bg-grey-lighter inline-block border-b-2 border-teal-light rounded-t py-2 px-4 text-grey-darkest font-semibold"
                                        onClick={()=>{
                                            this.changeState('showingApproved', 'showingUnapproved')
                                        }}
                                    >Approved</button>
                                </li>
                            </ul>

                            <AppNav />

                        </div>
                    : ''}

                </div>
    }
}


////// ORDERS TAB ////////
class OrdersNav extends React.Component{
    render(){
        return  <div>
                    <h3>Orders Tab!!!</h3>
                </div>
    }
}


// Header Bar for Main App
class Header extends React.Component{
    render(){
        return  <div>

                    <div class="flex items-center justify-between flex-wrap bg-grey-darkest p-6">

                        <div class="flex items-center flex-no-shrink text-white mr-8">

                            <span class="font-semibold text-3xl tracking-tight">Chop Chop</span>

                        </div>

                        <div class="flex items-center flex-no-shrink text-white mr-8">

                        {this.props.state.showingOrders ?
                            <span class="text-2xl tracking-tight">Orders</span>
                        : ''}

                        {this.props.state.showingReceipts ?
                            <span class="text-2xl tracking-tight">Receipts</span>
                        : ''}

                        {this.props.state.showingStatistics ?
                            <span class="text-2xl tracking-tight">Statistics</span>
                        : ''}

                        </div>

                    </div>

                </div>
    }
}
// Nav Bar for Main App
class MainNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.state = {
            showingOrders: false,
            showingReceipts: true,
            showingStatistics: false
        }
    }
    changeState(st1, st2, st3){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false
        })
    }
    render(){
        return  <div>

                    <Header
                        state={this.state}
                    />

                    {this.state.showingOrders ?

                        <div>

                            <div class="absolute pin-b w-full">

                                <button
                                    class="bg-grey-darkest text-white font-bold border-b-2 border-teal-light py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingOrders', 'showingReceipts', 'showingStatistics')
                                }}>Orders</button>

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingReceipts', 'showingOrders', 'showingStatistics')
                                }}>Receipts</button>

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingStatistics', 'showingOrders', 'showingReceipts')
                                }}>Statistics</button>

                            </div>

                            <OrdersNav
                                state={this.state}
                            />

                        </div>

                    : ''}

                    {this.state.showingReceipts ?

                        <div>

                            <div class="absolute pin-b w-full">

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingOrders', 'showingReceipts', 'showingStatistics')
                                }}>Orders</button>

                                <button
                                    class="bg-grey-darkest text-white font-bold border-b-2 border-teal-light py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingReceipts', 'showingOrders', 'showingStatistics')
                                }}>Receipts</button>

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingStatistics', 'showingOrders', 'showingReceipts')
                                }}>Statistics</button>

                            </div>

                            <ReceiptsNav
                                state={this.state}
                            />

                        </div>

                    : ''}

                    {this.state.showingStatistics ?

                        <div>

                            <div class="absolute pin-b w-full">

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingOrders', 'showingReceipts', 'showingStatistics')
                                }}>Orders</button>

                                <button
                                    class="bg-grey-darker hover:bg-grey-darkest text-white font-bold border-b-2 border-grey-darker py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingReceipts', 'showingOrders', 'showingStatistics')
                                }}>Receipts</button>

                                <button
                                    class="bg-grey-darkest text-white font-bold border-b-2 border-teal-light py-2 px-4 h-16 w-1/3"
                                    onClick={()=>{
                                    this.changeState('showingStatistics', 'showingOrders', 'showingReceipts')
                                }}>Statistics</button>

                            </div>

                            <StatisticsNav
                                state={this.state}
                            />

                        </div>

                    : ''}

                </div>
    }
}


// Renders: MainNav
ReactDOM.render(
    <MainNav />,
    document.querySelector('.main')
)
