import React, { Component } from 'react'
import Table from './Table'
import PieChart from './PieChart'

interface Istate {
  min: string, 
  max: string, 
  trg: string, 
  userInteraction: boolean, 
  btnDisabled: boolean, 
  mount: boolean
}
class Form extends Component<{}, Istate> {
  constructor(props: any) {
    super(props) 
    this.state = {
      min: '', 
			max: '', 
      trg: '', 
      userInteraction: false, 
			btnDisabled: false, 
      mount: true 
    }
  }
  mountCounter = () => this.setState({mount:true})
  unmountCounter = () => this.setState({mount:false})
  private formFunc = ():any => {
    let form
    form = 
      <div>
        <h1>Hell yea!</h1>
      </div>
    return form 
  }
  public render():JSX.Element {
    
    return (
      <div>
        <button onClick={this.mountCounter} disabled={this.state.mount}>Mount</button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount}>unmount</button>
        <h1>hello</h1>
        {this.formFunc()}
        {this.state.mount ? <Table />: null }
        {this.state.mount ? <PieChart />: null }
      </div>
    )
  }
}

export default Form

