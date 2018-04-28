// Header
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

// Credit Card, Online, Cash, Retake Nav Bar for Unapproved Receipts
class UnappNav extends React.Component{
    constructor(props){
        super(props)
        this.changeState = this.changeState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            showingCredit: '',
            showingOnline: '',
            showingCash: '',
            showingRetake: ''
        }
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
        this.props.state = this.state;
        console.log(this.state);
        console.log(this.props.state);
    }
    render(){
        return  <div>
                    <form onSubmit={this.handleSubmit}>
                        <button onClick={()=>this.changeState('showingCredit', 'showingOnline', 'showingCash', 'showingRetake')}>Credit Card</button>

                        <button onClick={()=>this.changeState('showingOnline', 'showingCredit', 'showingCash', 'showingRetake')}>Online</button>

                        <button onClick={()=>this.changeState('showingCash', 'showingCredit', 'showingOnline', 'showingRetake')}>Cash</button>

                        <button onClick={()=>this.changeState('showingRetake', 'showingCredit', 'showingOnline', 'showingCash')}>Retake</button>
                    </form>
                </div>
    }
}

// Credit Card, Online, Cash, and Retake Data Display-Tables
class DataTable extends React.Component{
    render(){
        return  <div>
                    {
                        this.props.state.showingCredit ?
                        <h3>DataTable: Unapproved Credit Card Receipts</h3> : ''
                    }
                    {
                        this.props.state.showingOnline ?
                        <h3>DataTable: Unapproved Online Receipts</h3> : ''
                    }
                    {
                        this.props.state.showingCash ?
                        <h3>DataTable: Unapproved Cash Receipts</h3> : ''
                    }
                    {
                        this.props.state.showingRetake ?
                        <h3>DataTable: Unapproved Retake Receipts</h3> : ''
                    }
                </div>
    }
}

// Unapproved Credit Card Receipts
class Unapproved extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showingCredit: true,
            showingOnline: false,
            showingCash: false,
            showingRetake: false
        }
    }
    render(){
        return  <div>
                    <Header />
                    <PrimaryNav />
                    <UnappNav state={this.state} />
                    <DataTable state={this.state} />
                </div>
    }
}

// Renders: Unapproved
ReactDOM.render(
    <Unapproved />,
    document.querySelector('.container')
)
