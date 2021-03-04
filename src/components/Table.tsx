import React, { Component } from 'react'

interface Iprops {
    minimum: string, 
    maximum: string, 
    target: string
}

interface Istate {
    attempts: number[] 
}

class Table extends Component<{formFields:Iprops}, Istate> {
    
    constructor(props: any) {
        super(props) 
        console.log('table: init state') //  1st - called once 
        this.state = {
            attempts: [] 
        }
    }
 
    private interval = ():any => { // 6th - called once 
        console.log('interval called');
        setInterval(() => this.appendTr(), 500);
    }

    public componentDidMount() { // 5th called - once 
        console.log('comp did mount');
        this.interval()
    }
    public componentWillUnmount() {
        console.log('comp unmounted');
        clearInterval(this.interval());
    }
    
    private appendTr = ():any => { // 4th - called again 
        console.log('A2 called');
        this.setState({ attempts: [...this.state.attempts, this.state.attempts.push(this.state.attempts.length)] })
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
                {this.state.attempts.map( (num, idx) => {
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
