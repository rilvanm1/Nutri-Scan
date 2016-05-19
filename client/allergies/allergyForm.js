import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('allergies');
Meteor.subscribe('productIngredients');

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
  },

  'click #allergyRemove': function(){
    let allergy = this._id;
    Meteor.call('allergy.remove', allergy);
  }
});

Template.allergyForm.helpers({
  allergy : function(){
    return Allergies.find().fetch();
  }
  
});










