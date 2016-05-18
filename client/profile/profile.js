import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('allergies');
Meteor.subscribe('productIngredients');

Template.userProfile.helpers({
	allergy : function(){
	   var allergy = Allergies.findOne({allergyName:"peanuts"}, {fields: {allergyName: 1} });
	   //console.log(allergy.allergyName);
	   return Allergies.find().fetch();
	}
});

Template.userProfile.events({
	'click #manageAlg': function(event) {
	    event.preventDefault();
	   	Router.go("/allergyForm"); 
	}
})