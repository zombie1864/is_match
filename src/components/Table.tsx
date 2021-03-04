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
    private tick() { // 8th - called again 
        this.setState(state => ({
          attempts: state.attempts + 1
        }));
      }
    private interval = ():any => { // 7th - called once 
        console.log('7');
        setInterval(() => this.tick(), 1000);
    }

    public componentDidMount() { // 6th called - once 
        console.log('comp did mount');
        this.interval()
    }
    public componentWillUnmount() {
        clearInterval(this.interval());
    }
    
    private appendTr = ():any => { // 5th - called again 
        let append
        append = <tr>
            <td>{this.state.attempts}</td>
        </tr>
        return append
    }

    appendChild = () => {
        let { auxNum } = this.state;
        auxNum.push(auxNum.length); // data.length is one more than actual length since array starts from 0.
        // Every time you call append row it adds new element to this array. 
        // You can also add objects here and use that to create row if you want.
        this.setState({auxNum});
    }

    private tableGenerator = ():JSX.Element => { // 4th - called again 
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
                {this.state.auxNum.map(id => (
                    this.appendTr()
                ))}
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
