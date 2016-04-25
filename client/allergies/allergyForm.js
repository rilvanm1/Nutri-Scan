import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './allergyForm.html';


Template.allergyForm.events({
  'submit form' : function(event, template) {

    event.preventDefault();
    const currentUserId = Meteor.userId();
    const allergyName = template.find('#allergyName').value;
   
    const newAllergy = {
      allergyName: allergyName,
      createdBy: currentUserId
    }

    Meteor.call('allergy.insert', newAllergy);
    alert(`Added: ${newAllergy.allergyName})`);
  }
});

Meteor.subscribe('allergies');


Template.allergyForm.helpers({
  allergy : function(){
    return Allergies.find().fetch();
  }
});










