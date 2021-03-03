import React, { Component } from 'react'
import Table from './Table'
import PieChart from './PieChart'
import { isNumValidator, formFieldsValidator } from './validators'

interface Istate {
  formFields: {
    minimum: string, 
    maximum: string, 
    target: string
  }, 
  renderTimedErrMsg: boolean, 
  renderUntimedErrMsg: boolean, 
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
      renderTimedErrMsg: false, 
      renderUntimedErrMsg: false, 
      mount: false 
    }
  }

  private mountComp = () => formFieldsValidator(this.state.formFields) ? this.setState({mount:true}) : this.setState({renderUntimedErrMsg:true});
  private unmountComp = () => this.setState({mount:false})

  private onChange = (event:any):void => {
    switch ( isNumValidator(event.target.value) ) {
      case true:
        this.unmountComp()
        this.setState({ renderUntimedErrMsg: false })
        const newState = { formFields: { ...this.state.formFields, [event.target.name]: (event.target.value) } } as Istate; // look into why the spreed op works 
        this.setState( newState )
        break;
      default:
        this.unmountComp()
        this.setState( { renderTimedErrMsg: true } )
        break;
    }
  }
  private renderErr = ():any => {
    return <p>Please type a number</p>
  }

  private setTimer = ():void => {
    setTimeout( () => {
      this.setState( { renderTimedErrMsg: false } )
    }, 1500)
  }

  public componentDidUpdate(prevProps:any, prevState:any) {
    return prevState.renderTimedErrMsg !== this.state.renderTimedErrMsg ? this.setTimer() : null
  }

  private formFunc = ():any => { // the value={ ... } not modular enough do research into this 
    let formContainer
    let formFields = Object.keys(this.state.formFields) // arrOfKeys 
    formContainer = 
      <div>
        <form>
          {formFields.map( (formField, idx) => {
            return <label key={idx}>
                {formField[0].toUpperCase() + formField.slice(1)}: 
                <input type="text" placeholder='0' onChange={this.onChange} name={formField} value={ idx === 0 ? this.state.formFields.minimum : idx === 1 ? this.state.formFields.maximum : this.state.formFields.target }/>
              </label>
          })}
          <button type="button" onClick={this.mountComp} disabled={this.state.mount}>Run Target</button>
        </form>
      </div>
    return formContainer
  }

  public render():JSX.Element {
    console.log(this.state);
    return (
      <div>
        {this.state.renderTimedErrMsg ? this.renderErr() : null }
        {this.state.renderUntimedErrMsg ? this.renderErr() : null }
        {this.formFunc()}
        <table>
          <tbody>
            <tr>
              <th style={ {border: '1px solid black'} }>
                {this.state.mount ? <Table />: 'No Data' }
              </th>
              <th style={ {border: '1px solid black'} }>
                {this.state.mount ? <PieChart />: null }
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Form

