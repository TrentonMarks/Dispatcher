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
    render(){
        return  <div>
                    <button>Credit Card</button>
                    <button>Online</button>
                    <button>Cash</button>
                    <button>Retake</button>
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
            showingCredit: false,
            showingOnline: false,
            showingCash: false,
            showingRetake: true
        }
    }
    render(){
        return  <div>
                    <Header />
                    <PrimaryNav />
                    <UnappNav />
                    <DataTable state={this.state} />
                </div>
    }
}

// Renders: Unapproved
ReactDOM.render(
    <Unapproved />,
    document.querySelector('.container')
)



/*
{
    this.state.showingCredit ?
    <DataTable /> : ''
}
{
    this.state.showingOnline ?
    <h3>Showing Unapproved Online Receipts</h3> : ''
}
{
    this.state.showingCash ?
    <h3>Showing Unapproved Cash Receipts</h3> : ''
}
{
    this.state.showingRetake ?
    <h3>Showing Unapproved Retake Receipts</h3> : ''
}
*/
