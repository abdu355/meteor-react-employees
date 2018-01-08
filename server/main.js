//server side code
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { image, helpers } from 'faker'; //helps create fake user data

import { Employees } from '../imports/collections/employees';

Meteor.startup(() => {
  //check if data exists in Collection
  const numberRecords = Employees.find({}).count(); //return number of records in collection
  //console.log(numberRecords);
  if (!numberRecords) {
    //generate fake data
    _.times(5000, () => {
      //call 5000 times
      const { name, email, phone } = helpers.createCard(); // faker card has multiple data fields

      //add to DB
      Employees.insert({
        name,
        email,
        phone,
        avatar: image.avatar() //faker avatar url
      });
    });
  }

  //publish the records for client to subscribe to
  Meteor.publish('employees', per_page => {
    return Employees.find({}, { limit: per_page }); //return cursor with first 20 records
  });
});
