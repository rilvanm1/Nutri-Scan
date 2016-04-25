Meteor.publish('allergies', function(){
    var currentUserId = this.userId;
    return Allergies.find({ createdBy: currentUserId });
});