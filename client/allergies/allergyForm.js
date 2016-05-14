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
Meteor.subscribe('productIngredients');

Template.allergyForm.helpers({
  allergy : function(){
    var allergy = Allergies.findOne({allergyName:"peanuts"}, {fields: {allergyName: 1} });
    //console.log(allergy.allergyName);
    return Allergies.find().fetch();
  },

  alertAllergy : function() {
    const allergies = Allergies.find().fetch();
    var productIngredients = Product.findOne({productName:'Kit Kat Bites'}, {fields: {productName: 1}});
    //return Product.find({productName:"Pretzels"}).fetch();
    allergies.forEach(function (post) {
      console.log(productIngredients.productName);
      console.log("Title of post " + ": "+ post.allergyName );
    //return productIngredients;
  });
  }
    /*
    while ( allergies.hasNext() ) {
        aller = allergies.next();
        console.log( aller.allergyName );
    }
  }*/
});










