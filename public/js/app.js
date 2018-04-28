// Header Bar
class Header extends React.Component{
    render(){
        return  <div>
                    <h1>Receipts</h1>
                </div>
    }
}
// Approved/Unapproved Nav Bar
class PrimaryNav extends React.Component{
    render(){
        return  <div>
                    <button>Unapproved</button>
                    <button>Approved</button>
                </div>
    }
}
// Data Tables for Unapproved CC, Online, Cash, and Retake Receipts
class DataTable extends React.Component{
    render(){
        return  <table>
                    <tbody>

                        {this.props.state.showingCredit ?
                            this.props.state.allCredit.map((creditcard, index)=>{
                                return  <div>
                                            <h3>Found: Unapproved Credit Receipt</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{creditcard.id}</em></p>
                                                    <p>Restaurant: <em>{creditcard.name}</em></p>
                                                    <p>Ordered At: <em>{creditcard.order_time}</em></p>
                                                    <p>Subtotal: <em>{creditcard.order_subtotal}</em></p>
                                                    <p>Tip: <em>{creditcard.submitted_tip}</em></p>
                                                    <p>Driver: <em>{creditcard.first_name}{creditcard.last_name}</em></p>
                                                    <p>Receipt Image: <em>{creditcard.receipt_image}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingOnline ?
                            this.props.state.allOnline.map((online, index)=>{
                                return  <div>
                                            <h3>Found: Unapproved Credit Receipt</h3>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{online.id}</em></p>
                                                    <p>Restaurant: <em>{online.name}</em></p>
                                                    <p>Ordered At: <em>{online.order_time}</em></p>
                                                    <p>Subtotal: <em>{online.order_subtotal}</em></p>
                                                    <p>Tip: <em>{online.submitted_tip}</em></p>
                                                    <p>Driver: <em>{online.first_name}{online.last_name}</em></p>
                                                    <p>Receipt Image: <em>{online.receipt_image}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingCash ?
                            this.props.state.allCash.map((cash, index)=>{
                                return  <div>
                                            <tr>
                                                <td>
                                                    <p>Order #: <em>{cash.id}</em></p>
                                                    <p>Restaurant: <em>{cash.name}</em></p>
                                                    <p>Ordered At: <em>{cash.order_time}</em></p>
                                                    <p>Subtotal: <em>{cash.order_subtotal}</em></p>
                                                    <p>Tip: <em>{cash.submitted_tip}</em></p>
                                                    <p>Driver: <em>{cash.first_name}{cash.last_name}</em></p>
                                                    <p>Receipt Image: <em>{cash.receipt_image}</em></p>
                                                </td>
                                            </tr>
                                        </div>
                            }) : ''
                        }
                        {
                            this.props.state.showingRetake ?
                            <h3>DataTable: Unapproved Retake Receipts</h3> : ''
                        }
                    </tbody>
                </table>
    }
}
// Credit Card, Online, Cash, Retake Nav Bar for Unapproved Receipts
class UnappNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCreditCard = this.getCreditCard.bind(this)
        this.getOnline = this.getOnline.bind(this)
        this.getCash = this.getCash.bind(this)
        this.state = {
            showingCredit: true,
            showingOnline: false,
            showingCash: false,
            showingRetake: false,
            allCredit: [],
            allOnline: [],
            allCash: [],
            creditcard: {},
            online: {},
            cash: {}
        }
    }
    componentDidMount(){
        this.getAllCredit()
        // this.getAllOnline()
        // this.getAllCash()
    }
    changeState(st1, st2, st3, st4){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false,
            [st4]: false
        })
    }
    handleSubmit(event){
        event.preventDefault();
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
    getAllCredit(){
        fetch('/receipts/unapproved/creditcard')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCredit: data
                })
                console.log(this.state.allCredit)
            }).catch(error => console.log(error))
    }
    getAllOnline(){
        fetch('/receipts/unapproved/online')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allOnline: data
                })
                console.log(this.state.allOnline);
            }).catch(error => console.log(error))
    }
    getAllCash(){
        fetch('/receipts/unapproved/cash')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCash: data
                })
                console.log(this.state.allCash)
            }).catch(error => console.log(error))
    }
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <button onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingRetake')}>Credit Card</button>

                        <button onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingRetake')}>Online</button>

                        <button onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingRetake')}>Cash</button>

                        <button onClick={()=>this.changeState('showingRetake', 'showingCredit', 'showingOnline', 'showingCash')}>Retake</button>

                    </form>

                    <DataTable state={this.state} />

                </div>
    }
}
// Unapproved Credit Card Receipts
class Unapproved extends React.Component{
    render(){
        return  <div>
                    <Header />
                    <PrimaryNav />
                    <UnappNav />
                </div>
    }
}

// Renders: Unapproved
ReactDOM.render(
    <Unapproved />,
    document.querySelector('.container')
)
