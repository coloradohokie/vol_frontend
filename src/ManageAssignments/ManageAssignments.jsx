import React from 'react'
import AssignmentsTable from '../AssignmentsTable'

const manageAssignments = (props) => {

    const awatingApproval = props.opportunities.filter( event => event.request_status.state === "Pending" )
    const awatingVerification = props.opportunities.filter( event => Date.parse(event.event_end) < Date.now() && event.request_status.state === "Approved" )
    const upcomingOpenOpportunities = props.opportunities.filter( event => Date.parse(event.event_end) >= Date.now() && event.request_status.state === "Open" )
    const allUpcomingOpportunities = props.opportunities.filter( event => Date.parse(event.event_end) >= Date.now())

    return (
        <div>
            <h2>Manage Assignments</h2>
            <h3>Awaiting Approval</h3>
            <AssignmentsTable opportunities = {awatingApproval} showContact />
            
            <h3>Awaiting Verification</h3>
            <AssignmentsTable opportunities = {awatingVerification} showContact />

            <h3>Upcoming Open Assignments</h3>
            <AssignmentsTable opportunities = {upcomingOpenOpportunities} showContact />
            
            <h3>All Upcoming Opportunities</h3>
            <AssignmentsTable opportunities = {allUpcomingOpportunities} showContact />
        </div>
    )
}

export default manageAssignments