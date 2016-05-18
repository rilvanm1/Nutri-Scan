Meteor.publish('allergies', function(){
    var currentUserId = this.userId;
    return Allergies.find({ createdBy: currentUserId});
});

Meteor.publish('productIngredients', function() {
	return Product.find().fetch();
});