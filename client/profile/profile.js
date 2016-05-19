import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('allergies');
Meteor.subscribe('productIngredients');

Template.userProfile.helpers({
	allergy : function(){
	   return Allergies.find().fetch();
	}
});

Template.userProfile.events({
	'click #manageAlg': function(event) {
	    event.preventDefault();
	   	Router.go("/allergyForm"); 
	}
})