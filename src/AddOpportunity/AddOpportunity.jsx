import React, {Component} from 'react'
import classes from './AddOpportunity.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import {checkValidity} from '../shared/utility'

class AddOpportunity extends Component {
    state = {
        controls: {

            eventName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Event Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },

            eventStart: {
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: 'Date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            eventEnd: {
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: 'Date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = async ( event ) => {
        event.preventDefault();
        try {
            const newActivity = {
                user_id: localStorage.getItem('userId'),
                date: this.state.controls.date.value,
                name: this.state.controls.name.value,
                distance: Math.round(this.state.controls.distance.value * 5280),
                duration: Math.round(this.state.controls.duration.value)
            }
            this.props.onAddActivity(newActivity)
        } catch (error) {
            console.error(error)
        }
    }
    

    render() {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form= formElementsArray.map( formElement => (
            <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event,formElement.id)} />
        ))


        return (
            <div className={classes.AddOpportunity}>
                <h2> Add New Opportunity </h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button>Add Opportunity</Button>
                </form>
            </div>
        )
    }
}

export default AddOpportunity