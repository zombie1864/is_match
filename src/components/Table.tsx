import React, { Component } from 'react'

interface Iprops {
    minimum: string, 
    maximum: string, 
    target: string
}

interface Istate {
    attempts: number, 
    auxNum: number[]
}

class Table extends Component<{formFields:Iprops}, Istate> {
    
    constructor(props: any) {
        super(props) 
        console.log('table: init state') //  1st - called once 
        this.state = {
            attempts: 0, 
            auxNum: []
        }
    }
    private tick() { // 7th - called again - go back to render 
        console.log('tick called');
        // let { auxNum } = this.state 
        // auxNum.push(auxNum.length)
        this.setState(state => ({
          attempts: state.attempts + 1
        }));
      }
    private interval = ():any => { // 6th - called once 
        console.log('interval called');
        
        setInterval(() => this.appendTr(), 1000);
    }

    public componentDidMount() { // 5th called - once 
        console.log('comp did mount');
        this.interval()
    }
    public componentWillUnmount() {
        console.log('comp unmounted');
        
        clearInterval(this.interval());
    }

    public componentDidUpdate(prevProps:any, prevState:any) { // 8th - go to tick 
        console.log('comp did update');
    }
    
    
    private appendTr = ():any => { // 4th - called again 
        console.log('A2 called');
        this.setState({ auxNum: [...this.state.auxNum, this.state.auxNum.push(this.state.auxNum.length)] })
        // let append
        // append = <tr>
        //     <td>{this.state.attempts}</td>
        // </tr>
        // return append
    }

    private tableGenerator = ():JSX.Element => { // 3rd - called again 
        console.log('A1 called');
        
        let tableHeaders:string[] = ['Attempt#', 'Current Random Number', 'Target Number', 'Is Match']
        let table
        table = <table>
            <tbody>
                <tr>
                    {tableHeaders.map( (th, idx) => {
                        return <th key={idx}>{th}</th>
                    })}
                </tr>
                {/* {this.appendTr()} */}
                {this.state.auxNum.map( (num, idx) => {
                    return <tr key={idx}><td>{num}</td></tr>
                })}
            </tbody>
        </table>
        return table 
    }

    render() {
        console.log('comp render'); // 2nd - called again 
        return (
            <div>
                {this.tableGenerator()}
            </div>
        )
    }
}

export default Table
