import React, { Component } from 'react'
import PieChartComp from './PieChart'

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
    },
    interval: any
}

const pieCss:React.CSSProperties = { 
    display: 'inline-block',
    position:'relative' ,
    left:'25px',
    top: '-20vh'
}

const tableCss:React.CSSProperties = {
    borderCollapse:'collapse',
    border:'1px solid #000000',  
    padding:'0 50px'
}

const tableContainerCss:React.CSSProperties = {
    display: 'inline-block',
    overflowY: 'scroll', 
    width: '50%',
    height: '80vh'
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
            },
            interval: null 
        }
    }

    public componentDidMount() { 
        this.setState({interval: setInterval(() => this.updateState(), 500)})
    }

    public componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    private updateState = ():void => { 
        this.setState({ 
            attempts: [...this.state.attempts, this.state.attempts.push(this.state.attempts.length) -1], 
            currRandNum: [
                ...this.state.currRandNum, 
                Math.floor( Math.random() * ( 
                    parseInt(this.props.formFields.maximum)  - parseInt(this.props.formFields.minimum) + 1 
                ) ) + parseInt(this.props.formFields.minimum) 
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
        let tableHeaders:string[] = ['Attempt#', 'Current Random Number', 'Target Number', 'Is Match']
        let table
        table = <table style={tableCss}>
            <tbody>
                <tr>
                    {tableHeaders.map( (th, idx) => {
                        return <th key={idx} style={tableCss}>{th}</th>
                    })}
                </tr>
                {this.state.attempts.map( (attemptNum, idx) => {
                    return <tr key={idx} >
                        <td style={tableCss}>{attemptNum}</td>
                        <td style={tableCss}>{this.state.currRandNum[idx]}</td>
                        <td style={tableCss}>{this.props.formFields.target}</td>
                        <td style={tableCss}>{this.isMatch(this.state.currRandNum[idx], parseInt(this.props.formFields.target))}</td>
                    </tr>
                })}
            </tbody>
        </table>
        return table 
    }

    render() {
        return (
            <div>
                <div style={tableContainerCss}>
                    {this.tableGenerator()}
                </div>
                <div style={pieCss}>
                    <PieChartComp isMatch={this.state.isMatch}/>
                </div>
            </div>
        )
    }
}

export default Table
