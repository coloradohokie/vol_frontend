import './App.css';
import React from 'react';
import MyAssignments from './MyAssignments'
import AddOpportunity from './AddOpportunity/AddOpportunity';
import NonVolunteer from './NonVolunteer'
import {AJAX} from './shared/utility'
import ManageAssignments from './ManageAssignments/ManageAssignments';

class App extends React.Component {
  state = {
    userId: 123456,
    opportunities: []
  }

  fetchAssignments = async () => {
    const endpoint="/opportunities"
    try {
      const response = await AJAX(endpoint)
      console.log(response)
      this.setState({opportunities: response})
      // response.forEach(element => element.weekNumber = Math.trunc((new Date(element.date).getTime() - startDate.getTime())/millisecondsInAWeek) + 1)
      // this.setState({activityHistory: response})
    } catch (error) {
      console.error(error)
    }
  }

  checkAuthState = () => {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //     console.error("No Token")
    //     this.setState({isAuthenticated: false})
    // } else {
    //     const expirationDate = localStorage.getItem('expirationDate')
    //     if (expirationDate < new Date()) {
    //         console.error("Token expired")
    //         this.logOut()

    //     } else {
    //         this.fetchActivities()
    //         this.setState({isAuthenticated: true})
    //     }
    // }

    this.fetchAssignments()
  }

  componentDidMount = () => {
    this.checkAuthState()
  }

  render() {
    console.log('STATE:', this.state)
    return (
      <div className="App">
        <h1>Non-Volunteers</h1>
        <ul>
          <li>Requst to be a volunteer (done)</li>
          <li>Cancel request to be a volunteer</li>
        </ul>
        <NonVolunteer />

        <h1>Volunteers</h1>
        <ul>
          <li>View past assignments (done)</li>
          <li>View future assignments (done)</li>
          <li>View future opportunities (done)</li>
          <li>Cancel existing assignments</li>
          <li>Request to be assigned to a future volunteering opportunity</li>
        </ul>
        <MyAssignments opportunities={this.state.opportunities} userId={this.state.userId} />

        <h1>Managers</h1>
        <ul>
          <li>Make Volunteer a non-volunteer</li>
          <li>Authorize request to become a volunteer</li>
          <li>Approve/Reject volunteer assignment requests</li>
          <li>Assign/Remove a volunteer to/from a volunteering opportunity</li>
          <li>View all assignments, filter by assigned, open, all</li>
          <li>View user credits</li>
          <li>Add roles</li>
        </ul>
        <AddOpportunity />
        <ManageAssignments opportunities={this.state.opportunities} />

        <h1>Admin</h1>
        <p>Assign/Remove Managers</p>
      </div>
    );
  }
}

export default App;
