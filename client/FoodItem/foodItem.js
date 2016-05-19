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


/*Food details*/
Template.foodDetails.helpers({
  allergy : function(){
    return Allergies.find().fetch();
  },

  alertAllergy : function(name) {
    let allergies = Allergies.find().fetch();
    let productIngredients = Product.findOne({productName:name}, {fields: {ingredients: 1}});
    let allergyArr = new Array();

    allergies.forEach(function (allergy) {
      let ingredients= productIngredients.ingredients;
      if (ingredients.toLowerCase().indexOf(allergy.allergyName) >= 0) {
        allergyArr.push(allergy.allergyName);
      }
  });
    return allergyArr;
  },

  foundAllergy: function(name) {
    let allergies = Allergies.find().fetch();
    let productIngredients = Product.findOne({productName:name}, {fields: {ingredients: 1}});
    //return Product.find({productName:"Pretzels"}).fetch();
    let count=0;
    let allergyArr = new Array();

    allergies.forEach(function (allergy) {
      let ingredients= productIngredients.ingredients;
      console.log(ingredients);
      if (ingredients.toLowerCase().indexOf(allergy.allergyName) >= 0) {
        allergyArr.push(allergy.allergyName);
        count++;
      }
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








