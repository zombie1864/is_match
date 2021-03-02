import React, { Component } from 'react'
import Table from './Table'
import PieChart from './PieChart'

interface Istate {
  formFields: {
    minimum: string, 
    maximum: string, 
    target: string
  },
  userInteraction: boolean, 
  btnDisabled: boolean, 
  mount: boolean
}
class Form extends Component<{}, Istate> {
  constructor(props: any) {
    super(props) 
    this.state = {
      formFields: {
        minimum: '', 
        maximum: '', 
        target: ''
      },
      userInteraction: false, 
			btnDisabled: false, 
      mount: true 
    }
  }
  mountCounter = () => this.setState({mount:true})
  unmountCounter = () => this.setState({mount:false})
  private formFunc = ():any => {
    let form
    let formFields = Object.keys(this.state.formFields) // arrOfKeys 
    form = 
      <div>
        <form>
          {formFields.map( formField => {
            return <label>{formField[0].toUpperCase() + formField.slice(1)}</label>
          })}
        </form>
      </div>
    return form 
  }
  public render():JSX.Element {

    return (
      <div>
        <button onClick={this.mountCounter} disabled={this.state.mount}>Mount</button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount}>unmount</button>
        <h1>form</h1>
        {this.formFunc()}
        {this.state.mount ? <Table />: null }
        {this.state.mount ? <PieChart />: null }
      </div>
    )
  }
}

export default Form

