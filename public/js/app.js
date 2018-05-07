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

                        <button onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>

                        <button onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>

                        <button onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

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

                        <button onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>

                        <button onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>

                        <button onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

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

                        <button onClick={()=>this.changeState('showingDay', 'showingWeek', 'showingMonth')}>Day</button>

                        <button onClick={()=>this.changeState('showingWeek', 'showingDay', 'showingMonth')}>Week</button>

                        <button onClick={()=>this.changeState('showingMonth', 'showingDay', 'showingWeek')}>Month</button>

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

                    <button onClick={()=>{
                        this.changeState('showingRestaurants', 'showingDrivers', 'showingHead')
                    }}>Restaurants</button>

                    <button onClick={()=>{
                        this.changeState('showingDrivers', 'showingRestaurants', 'showingHead')
                    }}>Drivers</button>

                    <button onClick={()=>{
                        this.changeState('showingHead', 'showingRestaurants', 'showingDrivers')
                    }}>Head</button>

                    {this.state.showingRestaurants ?
                        <RestaurantsNav />
                    : ''}

                    {this.state.showingDrivers ?
                        <DriversNav />
                    : ''}

                    {this.state.showingHead ?
                        <HeadNav />
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

                        <button onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingReceipt')}>Credit Card</button>

                        <button onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingReceipt')}>Online</button>

                        <button onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingReceipt')}>Cash</button>

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
        return  <table>
                    <tbody>

                        {this.props.state.showingCredit ?
                            this.props.state.allCredit.map((creditcard, index)=>{
                                return  <div>
                                            <h3>CREDIT</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{creditcard.id}</em></p>
                                                    <p>Restaurant: <em>{creditcard.name}</em></p>
                                                    <p>Ordered At: <em>{creditcard.order_time}</em></p>
                                                    <p>Subtotal: <em>{creditcard.order_subtotal}</em></p>
                                                    <p>Tip: <em>{creditcard.submitted_tip}</em></p>
                                                    <p>Driver: <em>{creditcard.first_name} {creditcard.last_name}</em></p>
                                                    <p>Receipt Image: <em>{creditcard.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(creditcard)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingOnline ?
                            this.props.state.allOnline.map((online, index)=>{
                                return  <div>
                                            <h3>ONLINE</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{online.id}</em></p>
                                                    <p>Restaurant: <em>{online.name}</em></p>
                                                    <p>Ordered At: <em>{online.order_time}</em></p>
                                                    <p>Subtotal: <em>{online.order_subtotal}</em></p>
                                                    <p>Tip: <em>{online.submitted_tip}</em></p>
                                                    <p>Driver: <em>{online.first_name} {online.last_name}</em></p>
                                                    <p>Receipt Image: <em>{online.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(online)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingCash ?
                            this.props.state.allCash.map((cash, index)=>{
                                return  <div>
                                            <h3>CASH</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{cash.id}</em></p>
                                                    <p>Restaurant: <em>{cash.name}</em></p>
                                                    <p>Ordered At: <em>{cash.order_time}</em></p>
                                                    <p>Subtotal: <em>{cash.order_subtotal}</em></p>
                                                    <p>Tip: <em>{cash.submitted_tip}</em></p>
                                                    <p>Driver: <em>{cash.first_name} {cash.last_name}</em></p>
                                                    <p>Receipt Image: <em>{cash.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(cash)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingReceipt ?
                                <div>
                                    <h3>SHOW</h3>
                                    <tr>
                                        <td>
                                            <p>Order #: <em>{this.props.state.receipt.id}</em></p>
                                            <p>Restaurant: <em>{this.props.state.receipt.name}</em></p>
                                            <p>Ordered At: <em>{this.props.state.receipt.order_time}</em></p>
                                            <p>Subtotal: <em>{this.props.state.receipt.order_subtotal}</em></p>
                                            <p>Tip: <em>{this.props.state.receipt.submitted_tip}</em></p>
                                            <p>Driver: <em>{this.props.state.receipt.first_name} {this.props.state.receipt.last_name}</em></p>
                                            <p>Receipt Image: <em>{this.props.state.receipt.receipt_image}</em></p>
                                            <button onClick={()=>{this.props.assignAsUnapproved(this.props.state.receipt)}}>Unapprove</button>
                                        </td>
                                    </tr>
                                </div> : ''
                        }
                    </tbody>
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

                        <button onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Credit Card</button>

                        <button onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Online</button>

                        <button onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingRetake', 'showingReceipt', 'showingEditForm')}>Cash</button>

                        <button onClick={()=>this.changeState('showingRetake', 'showingCredit', 'showingOnline', 'showingCash', 'showingReceipt', 'showingEditForm')}>Retake</button>

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
        return  <table>
                    <tbody>

                        {
                            this.props.state.showingCredit ?
                            this.props.state.allCredit.map((creditcard, index)=>{
                                return  <div>
                                            <h3>CREDIT</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{creditcard.id}</em></p>
                                                    <p>Restaurant: <em>{creditcard.name}</em></p>
                                                    <p>Ordered At: <em>{creditcard.order_time}</em></p>
                                                    <p>Subtotal: <em>{creditcard.order_subtotal}</em></p>
                                                    <p>Tip: <em>{creditcard.submitted_tip}</em></p>
                                                    <p>Driver: <em>{creditcard.first_name} {creditcard.last_name}</em></p>
                                                    <p>Receipt Image: <em>{creditcard.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(creditcard)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingEditForm')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingOnline ?
                            this.props.state.allOnline.map((online, index)=>{
                                return  <div>
                                            <h3>ONLINE</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{online.id}</em></p>
                                                    <p>Restaurant: <em>{online.name}</em></p>
                                                    <p>Ordered At: <em>{online.order_time}</em></p>
                                                    <p>Subtotal: <em>{online.order_subtotal}</em></p>
                                                    <p>Tip: <em>{online.submitted_tip}</em></p>
                                                    <p>Driver: <em>{online.first_name} {online.last_name}</em></p>
                                                    <p>Receipt Image: <em>{online.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(online)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingEditForm')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingCash ?
                            this.props.state.allCash.map((cash, index)=>{
                                return  <div>
                                            <h3>CASH</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{cash.id}</em></p>
                                                    <p>Restaurant: <em>{cash.name}</em></p>
                                                    <p>Ordered At: <em>{cash.order_time}</em></p>
                                                    <p>Subtotal: <em>{cash.order_subtotal}</em></p>
                                                    <p>Tip: <em>{cash.submitted_tip}</em></p>
                                                    <p>Driver: <em>{cash.first_name} {cash.last_name}</em></p>
                                                    <p>Receipt Image: <em>{cash.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(cash)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingEditForm')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingRetake ?
                            this.props.state.allRetake.map((retake, index)=>{
                                return  <div>
                                            <h3>RETAKE</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{retake.id}</em></p>
                                                    <p>Restaurant: <em>{retake.name}</em></p>
                                                    <p>Ordered At: <em>{retake.order_time}</em></p>
                                                    <p>Subtotal: <em>{retake.order_subtotal}</em></p>
                                                    <p>Tip: <em>{retake.submitted_tip}</em></p>
                                                    <p>Driver: <em>{retake.first_name} {retake.last_name}</em></p>
                                                    <p>Receipt Image: <em>{retake.receipt_image}</em></p>
                                                    <button onClick={()=>{
                                                        this.props.getReceipt(retake)
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake','showingEditForm')
                                                    }}>View</button>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingReceipt ?
                                <div>
                                    <h3>SHOW</h3>
                                    <tr>
                                        <td>
                                            <p>Order #: <em>{this.props.state.receipt.id}</em></p>
                                            <p>Restaurant: <em>{this.props.state.receipt.name}</em></p>
                                            <p>Ordered At: <em>{this.props.state.receipt.order_time}</em></p>
                                            <p>Subtotal: <em>{this.props.state.receipt.order_subtotal}</em></p>
                                            <p>Tip: <em>{this.props.state.receipt.submitted_tip}</em></p>
                                            <p>Driver: <em>{this.props.state.receipt.first_name} {this.props.state.receipt.last_name}</em></p>
                                            <p>Receipt Image: <em>{this.props.state.receipt.receipt_image}</em></p>
                                            <button onClick={()=>{this.props.assignAsRetake(this.props.state.receipt)}}>Retake</button>
                                            <button onClick={()=>{
                                                this.props.changeState('showingEditForm', 'showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
                                            }}>Edit</button>
                                            <button onClick={()=>{this.props.assignAsApproved(this.props.state.receipt)}}>Approve</button>
                                        </td>
                                    </tr>
                                </div> : ''
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
                    </tbody>
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

                        <input type='submit' />

                        <button onClick={()=>this.props.changeState('showingCredit', 'showingEditForm')}>Cancel
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

                    <button onClick={()=>{
                        this.changeState('showingUnapproved', 'showingApproved')
                    }}>Unapproved</button>

                    <button onClick={()=>{
                        this.changeState('showingApproved', 'showingUnapproved')
                    }}>Approved</button>

                    {this.state.showingUnapproved ?
                        <UnappNav />
                    : ''}

                    {this.state.showingApproved ?
                        <AppNav />
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

                    {this.props.state.showingOrders ?
                        <h1>Orders</h1>
                    : ''}

                    {this.props.state.showingReceipts ?
                        <h1>Receipts</h1>
                    : ''}

                    {this.props.state.showingStatistics ?
                        <h1>Statistics</h1>
                    : ''}

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

                    <button onClick={()=>{
                        this.changeState('showingOrders', 'showingReceipts', 'showingStatistics')
                    }}>Orders</button>

                    <button onClick={()=>{
                        this.changeState('showingReceipts', 'showingOrders', 'showingStatistics')
                    }}>Receipts</button>

                    <button onClick={()=>{
                        this.changeState('showingStatistics', 'showingOrders', 'showingReceipts')
                    }}>Statistics</button>

                    {this.state.showingOrders ?
                        <OrdersNav state={this.state} />
                    : ''}

                    {this.state.showingReceipts ?
                        <ReceiptsNav state={this.state}/>
                    : ''}

                    {this.state.showingStatistics ?
                        <StatisticsNav state={this.state}/>
                    : ''}

                </div>
    }
}


// Renders: MainNav
ReactDOM.render(
    <MainNav />,
    document.querySelector('.container')
)
