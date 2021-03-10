import React, { Component } from 'react'
import Table from './Table'
import { isNumValidator, formFieldsValidator } from '../validators/validators'

interface Istate {
  formFields: {
    minimum: string, 
    maximum: string, 
    target: string
  }, 
  renderTimedErrMsg: boolean, 
  renderUntimedErrMsg: boolean, 
  inject: boolean
}

interface formFields {
  minimum: string, 
  maximum: string, 
  target: string
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
      inject: false 
    }
  }

  private mountComp = () => formFieldsValidator(this.state.formFields) ? this.setState({inject:true}) : this.setState({renderUntimedErrMsg:true});

  private onChange = (event:any):void => {
    switch ( isNumValidator(event.target.value) ) {
      case true:
        const newState = { 
          renderUntimedErrMsg: false, 
          formFields: { ...this.state.formFields, [event.target.name]: (event.target.value) },
          inject: false
        } as Istate; 
        this.setState( newState )
        break;
      default:
        this.setState( { renderTimedErrMsg: true, inject: false } )
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

  private formFunc = ():any => { 
    let formContainer
    let formFields = Object.keys(this.state.formFields) // arrOfKeys 
    formContainer = 
      <div>
        <form>
          {formFields.map( (formField, idx) => {
            return <label key={idx}>
                {formField[0].toUpperCase() + formField.slice(1)}: 
                <input type="text" placeholder='0' onChange={this.onChange} name={formField} value={ this.state.formFields[formField as keyof formFields] }/>
              </label>
          })}
          <button type="button" onClick={this.mountComp} disabled={this.state.inject}>Run Target</button>
        </form>
      </div>
    return formContainer
  }

  public render():JSX.Element {
    return (
      <div>
        {this.state.renderTimedErrMsg ? this.renderErr() : 
        this.state.renderUntimedErrMsg ? this.renderErr() : null}
        {this.formFunc()}
        {this.state.inject ? <Table formFields={this.state.formFields}/> : 'No Data' } {/*this is called flagging*/}
      </div>
    )
  }
}

export default Form

