import React, { Component } from 'react'

interface Iprops {
    minimum: string, 
    maximum: string, 
    target: string
}

interface Istate {
    attempts: number 
}

class Table extends Component<{formFields:Iprops}, Istate> {
    
    constructor(props: any) {
        super(props) 
        console.log('table: init state')
        this.state = {
            attempts: 0 
        }
    }

    private appendTr = ():any => {
        setTimeout( () => {
            this.setState( {attempts: 1} )
            let append
            append = <tr>
                <td>=0</td>
            </tr>
            return append
        }, 500)  
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
                {this.appendTr()}
            </tbody>
        </table>
        return table 
    }
    render() {
        console.log('table: render');
        return (
            <div>
                {this.tableGenerator()}
            </div>
        )
    }
}

export default Table
