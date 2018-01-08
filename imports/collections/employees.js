//DB collection employees
import { Mongo } from 'meteor/mongo';

export const Employees = new Mongo.Collection('employees');
//export without default keyword because we might have other variables that we need to export later on

//make sure to remove autopublish from meteor to secure data
