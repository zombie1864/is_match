import React, { Component } from 'react'
// import PieChart from './PieChart'

interface Iprops {
    minimum: string, 
    maximum: string, 
    target: string
}

interface Istate {
    attempts: number[], 
    currRandNum: number[], 
    isMatch: {
        YESs: number, 
        NOs: number 
    }
}

class Table extends Component<{formFields:Iprops}, Istate> {
    constructor(props: any) {
        super(props) 
        this.state = {
            attempts: [], 
            currRandNum: [], 
            isMatch: {
                YESs: 0, 
                NOs: 0
            }
        }
    }

    public componentDidMount() { 
        setInterval(() => this.updateState(), 2500);
    }

    public componentWillUnmount() {
        clearInterval(setInterval(() => this.updateState()));
    }
    
    private updateState = ():void => { 
        // console.log('updateState is third')
        this.setState({ 
            attempts: [...this.state.attempts, this.state.attempts.push(this.state.attempts.length)], 
            currRandNum: [
                ...this.state.currRandNum, 
                Math.floor( Math.random() * ( parseInt(this.props.formFields.maximum) + 1 ) ) 
            ]
        })
        if ( parseInt(this.props.formFields.target) === this.state.currRandNum[this.state.currRandNum.length - 1] ) {
            this.setState( { isMatch: { ...this.state.isMatch, YESs: this.state.isMatch.YESs + 1} })
        } else {
            this.setState( { isMatch: { ...this.state.isMatch, NOs: this.state.isMatch.NOs + 1} })
        }
    }
    
    private isMatch = (currRandNum:number, targetValue:number):string => {
        return currRandNum === targetValue ? 'YES' : 'NO'
    }

    private tableGenerator = ():JSX.Element => { 
        // console.log('tableGenerator is first');
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
        // console.log(this.state);
        
        return (
            <div>
                {this.tableGenerator()}
                {/* <PieChart isMatch={this.state.isMatch}/> */}
            </div>
        )
    }
}

export default Table
