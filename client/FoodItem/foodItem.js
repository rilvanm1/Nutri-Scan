Template.foodItem.events({
    'click .keyboardimg': function(event){
        event.preventDefault();
        Router.go('search');
    }
});

Template.search.onCreated(function onCreated(){
  query = new ReactiveVar("")
  Deps.autorun(function(){
    Meteor.subscribe('product', query.get());
  });
});

Template.search.helpers({
  foodItem : function(){
    return Product.find().fetch();
  }
});

Template.foodDetails.helpers({
  displayProtein : function(protein){
    return protein;
  }
});

Template.search.events({
  'keypress #search': function(event){
    console.log($('#search').val());
    query.set($('#search').val());
  }
});









