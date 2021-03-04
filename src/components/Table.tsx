import React, { Component } from 'react'

interface Iprops {
    minimum: string, 
    maximum: string, 
    target: string
}

interface Istate {
    attempts: number[], 
    currRandNum: number[]
}

class Table extends Component<{formFields:Iprops}, Istate> {
    constructor(props: any) {
        super(props) 
        this.state = {
            attempts: [], 
            currRandNum: [] // save recor
        }
    }

    public componentDidMount() { 
        setInterval(() => this.saveRecords(), 500);
    }

    public componentWillUnmount() {
        clearInterval(setInterval(() => this.saveRecords()));
    }
    
    private saveRecords = ():void => { 
        this.setState({ 
            attempts: [...this.state.attempts, this.state.attempts.push(this.state.attempts.length)], 
            currRandNum: [
                ...this.state.currRandNum, 
                Math.floor( Math.random() * ( parseInt(this.props.formFields.maximum) + 1 ) ) 
            ]
         })
    }

    private isMatch = (currRandNum:number, targetValue:number):string => {
        return currRandNum === targetValue ? 'YES' : 'NO'
    }

    private tableGenerator = ():JSX.Element => { 
        let tableHeaders:string[] = ['Attempt#', 'Current Random Number', 'Target Number', 'Is Match']
        let table
        table = <table>
            <tbody>
                <tr>
                    {tableHeaders.map( (th, idx) => {
                        return <th key={idx}>{th}</th>
                    })}
                </tr>
                {this.state.attempts.map( (attemptNum, idx) => {
                    return <tr key={idx}>
                        <td>{attemptNum}</td>
                        <td>{this.state.currRandNum[idx]}</td>
                        <td>{this.props.formFields.target}</td>
                        <td>{this.isMatch(this.state.currRandNum[idx], parseInt(this.props.formFields.target))}</td>
                    </tr>
                })}
            </tbody>
        </table>
        return table 
    }

    render() {
        return (
            <div>
                {this.tableGenerator()}
            </div>
        )
    }
}

export default Table
