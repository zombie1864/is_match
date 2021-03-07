import React, { Component } from 'react'
import PieChart from './PieChart'

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
        setInterval(() => this.updateState(), 500);
    }

    public componentWillUnmount() {
        clearInterval(setInterval(() => this.updateState()));
    }
    
    private updateState = ():void => { 
        this.setState({ 
            attempts: [...this.state.attempts, this.state.attempts.push(this.state.attempts.length) -1], 
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
        let tableHeaders:string[] = ['Attempt#', 'Current Random Number', 'Target Number', 'Is Match']
        let table
        table = <table style={this.tableCss()}>
            <tbody style={this.tableCss()}>
                <tr style={this.tableCss()}>
                    {tableHeaders.map( (th, idx) => {
                        return <th key={idx} style={this.tableCss()}>{th}</th>
                    })}

                </tr>
                {this.state.attempts.map( (attemptNum, idx) => {
                    return <tr key={idx} style={this.tableCss()}>
                        <td style={this.tableCss()}>{attemptNum}</td>
                        <td style={this.tableCss()}>{this.state.currRandNum[idx]}</td>
                        <td style={this.tableCss()}>{this.props.formFields.target}</td>
                        <td style={this.tableCss()}>{this.isMatch(this.state.currRandNum[idx], parseInt(this.props.formFields.target))}</td>
                    </tr>
                })}
            </tbody>
        </table>
        return table 
    }

    private pieCss = ():React.CSSProperties => {
        return {
            color: 'red',
            display: 'inline-block',
            position:'relative' ,
            left:'100px',
            top: '-500px'
        }
    }

    private tableCss = ():React.CSSProperties => {
        return {
            borderCollapse:'collapse',
            border:'1px solid #000000'
        } 
    }

    private tableContainerCss = ():React.CSSProperties => {
        return {
            display: 'inline-block',
            overflowY: 'scroll', 
            width: '55%',
            height: '800px'
        }
    }

    render() {
        return (
            <div>
                <div style={this.tableContainerCss()}>
                    {this.tableGenerator()}
                </div>
                <div style={this.pieCss()}>
                    <PieChart isMatch={this.state.isMatch}/>
                </div>
            </div>
        )
    }
}

export default Table
