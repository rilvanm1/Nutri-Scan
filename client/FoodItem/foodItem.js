Meteor.subscribe('allergies');
Meteor.subscribe('productIngredients');

/*Search*/
Template.search.helpers({
  foodItem : function(){
    return Product.find().fetch();
  }
});

Template.search.onCreated(function onCreated(){
  query = new ReactiveVar("")
  Deps.autorun(function(){
    Meteor.subscribe('product', query.get());
  });
});

Template.search.events({
  'keypress #search': function(event){
    console.log($('#search').val());
    query.set($('#search').val());
  }
});

/*Food Item*/
Template.foodItem.events({
    'click #keyboardimg': function(event){
        event.preventDefault();
        Router.go('search');
    }
});

Template.foodDetails.helpers({
  displayProtein : function(protein){
    return protein;
  }
});

/*Food details*/
Template.foodDetails.helpers({
  allergy : function(){
    var allergy = Allergies.findOne({allergyName:"peanuts"}, {fields: {allergyName: 1} });
    //console.log(allergy.allergyName);
    return Allergies.find().fetch();
  },

  alertAllergy : function(name) {
    const allergies = Allergies.find().fetch();
    var productIngredients = Product.findOne({productName:name}, {fields: {ingredients: 1}});
    //return Product.find({productName:"Pretzels"}).fetch();
    let arr = new Array();
    allergies.forEach(function (post) {
      let ingredients= productIngredients.ingredients;
      console.log(ingredients);
      
      //console.log("psot: "+post.allergyName);
      if (ingredients.toLowerCase().indexOf(post.allergyName) >= 0) {
        arr.push(post.allergyName);
        console.log("found");
      }
      console.log("array:"+arr);
      
      //console.log("Title of post " + ": "+ post.allergyName );
      //return productIngredients;

  });
    return arr;
  },
  /*
    while ( allergies.hasNext() ) {
        aller = allergies.next();
        console.log( aller.allergyName );
    }
  }*/
  foundAllergy: function(name) {
    const allergies = Allergies.find().fetch();
    var productIngredients = Product.findOne({productName:name}, {fields: {ingredients: 1}});
    //return Product.find({productName:"Pretzels"}).fetch();
    let count=0;
    let arr = new Array();
    allergies.forEach(function (post) {
      let ingredients= productIngredients.ingredients;
      console.log(ingredients);
      
      //console.log("psot: "+post.allergyName);
      if (ingredients.toLowerCase().indexOf(post.allergyName) >= 0) {
        arr.push(post.allergyName);
        count++;
        console.log("foundeddd");
      }
      
        
      
      console.log("array:"+arr);
      
      //console.log("Title of post " + ": "+ post.allergyName );
      //return productIngredients;

    });
    if(count>0) {
      return true;
    } else {
    return false;
    }
  }
  
});
Template.foodDetails.topGenresChart = function() {
    fat=parseInt(this.fat);
    protein=parseInt(this.protein);
    carbohydrate=parseInt(this.carbohydrate);

    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ""
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: [
                ['Fat',   fat],
                ['Protein', protein],
                ['carbohydrate',   carbohydrate]
            ]
        }]
    };
};








