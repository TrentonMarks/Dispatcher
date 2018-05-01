///////////////////////////
//// Approved Receipts ////
///////////////////////////

// Credit Card, Online, Cash Nav Bar for Unapproved Receipts
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
// Data Tables for Approved CC, Online, and Cash Receipts
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


///////////////////////////
/// Unapproved Receipts ///
///////////////////////////

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
        this.state = {
            showingCredit: true,
            showingOnline: false,
            showingCash: false,
            showingRetake: false,
            showingReceipt: false,
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
    changeState(st1, st2, st3, st4, st5){
        this.setState({
            [st1]: true,
            [st2]: false,
            [st3]: false,
            [st4]: false,
            [st5]: false
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
    render(){
        return  <div>

                    <form onSubmit={this.handleSubmit}>

                        <button onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingRetake', 'showingReceipt')}>Credit Card</button>

                        <button onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingRetake', 'showingReceipt')}>Online</button>

                        <button onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingRetake', 'showingReceipt')}>Cash</button>

                        <button onClick={()=>this.changeState('showingRetake', 'showingCredit', 'showingOnline', 'showingCash', 'showingReceipt')}>Retake</button>

                    </form>

                    <UnappTable
                        state = {this.state}
                        changeState = {this.changeState}
                        getReceipt = {this.getReceipt}
                        assignAsRetake = {this.assignAsRetake}
                        assignAsApproved = {this.assignAsApproved}
                    />

                </div>
    }
}
// Data Table for Unapproved CC, Online, Cash, and Retake Receipts
class UnappTable extends React.Component{
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
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
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
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
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
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
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
                                                        this.props.changeState('showingReceipt', 'showingCredit', 'showingOnline', 'showingCash', 'showingRetake')
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
                                            <button onClick={()=>{this.props.assignAsApproved(this.props.state.receipt)}}>Approve</button>
                                        </td>
                                    </tr>
                                </div> : ''
                        }
                    </tbody>
                </table>
    }
}
// Form Within Show-Page to Update Submitted Receipts
class UpdateForm extends React.Component{
    render(){
        
    }
}


///////////////////////////
////////// Other //////////
///////////////////////////

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

                    <Header />

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


// Renders: PrimaryNav
ReactDOM.render(
    <PrimaryNav />,
    document.querySelector('.container')
)
