import React from 'react'
import moment from 'moment'

const assignmentsTable = (props) => {
    const printRow = () => {
        return props.opportunities.map( opp => {
            const shiftDefined = (opp.shift_start && opp.shift_end)
            const actionButton = (action) => {
                if (action === 'cancel') return <td><button>Cancel</button></td>
                if (action === 'request') return <td><button>Request</button></td>
                return <td></td>
            }
            return (
                <tr>
                    <td>{opp.contact_id}</td>
                    <td>{opp.event_title}</td>
                    <td>{moment(opp.event_start).format('ddd MMM Do h:mm a')} - {moment(opp.event_end).format('h:mm a')}</td>
                    <td>{opp.role.role}</td>
                    <td>{shiftDefined ? (moment(opp.shift_start).format('h:mm a') + " - " + moment(opp.shift_end).format('h:mm a')) : '--'}</td>
                    <td>{opp.credit_hours ? opp.credit_hours.toFixed(2) + "*": ((Date.parse(opp.shift_end) - Date.parse(opp.shift_start))/ (1000 * 60 * 60) ).toFixed(2)}</td>
                    <td>{opp.role.rate.toFixed(2)}</td>
                    <td>{(opp.role.rate * opp.credit_hours).toFixed(2)}</td>
                    <td>{opp.request_status.state}</td>
                    {actionButton(props.action)}
                </tr>
            )
        })
    }


    return (
        <table>
            <thead>
            <tr>
                <th>Volunteer</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Credit Hours</th>
                <th>Credit Rate</th>
                <th>Credit</th>
                <th>Status</th>
                <th>{props.action ? 'Button' : '' }</th>
            </tr>
            </thead>

            <tbody>
                {console.log ('cancel', props.cancelButton)}
                { printRow() }
            </tbody>
        </table>
    )
}


export default assignmentsTable