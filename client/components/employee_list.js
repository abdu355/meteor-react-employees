import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';
import _ from 'lodash';

const PER_PAGE = 20;

class EmployeeList extends React.Component {
  componentWillMount() {
    this.page = 1;
  }
  handleClick() {
    //update subscription - adds new records to our subscription
    Meteor.subscribe('employees', PER_PAGE * ++this.page); //this is where we increment the count
    this.page++;
  }
  render() {
    return (
      <div>
        <h2>Employee List</h2>
        <div className="employee-list">
          {_.map(this.props.employees, (employee, i) => (
            <EmployeeDetail employee={employee} key={employee._id} />
          ))}
        </div>
        <button
          onClick={this.handleClick.bind(this)}
          className="btn btn-primary"
        >
          Load More
        </button>
      </div>
    );
  }
}
//meteor container will watch a subscription and passes new data to props and causes component to re-render when required
export default createContainer(() => {
  //set up subscription with DB
  Meteor.subscribe('employees', PER_PAGE);
  //return object to be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
