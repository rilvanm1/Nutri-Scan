import { Meteor } from 'meteor/meteor';

/*Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   // Returns the user object
   return user;
});*/
Meteor.methods({
	'allergy.insert': function(allergy) {
	 Allergies.insert(allergy);
},
'product.insert': function(foodItem) {
    Product.insert(foodItem);
},
  'allergy.remove':function(allergy){
    Allergies.remove({_id:allergy});
  }




});

/*Meteor.methods({
	'prodcut.insert': function(foodItem) {
	 Product.insert(foodItem);
}


});*/