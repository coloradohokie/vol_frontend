import React, {Component} from "react";
import AssignmentsTable from './AssignmentsTable'

class MyAssignments extends Component {
    render() {
        const pastAssignments = this.props.opportunities.filter( event => Date.parse(event.event_end) < Date.now() && event.contact_id === this.props.userId )
        const upcomingAssignments = this.props.opportunities.filter( event => Date.parse(event.event_end) >= Date.now() && event.contact_id === this.props.userId)
        const upcomingOpportunities = this.props.opportunities.filter( event => Date.parse(event.event_end) >= Date.now() && !event.contact_id)
        return (
            <div>
                <h2>My Activity</h2>
                <h3>Past Assignments</h3>
                { console.log(pastAssignments, Date.now())}
                <AssignmentsTable opportunities = {pastAssignments} />
                <h3>Upcoming Assignments</h3>
                <AssignmentsTable opportunities = {upcomingAssignments} action={'cancel'} cancelButton = {true} />
                <h3>Upcoming Opportunities</h3>
                <AssignmentsTable opportunities = {upcomingOpportunities} action={'request'} requestButton />
            </div>
        )
    }
}

export default MyAssignments