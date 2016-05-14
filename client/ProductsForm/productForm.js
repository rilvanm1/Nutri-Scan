import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './productForm.html';


Template.productForm.events({
  'submit form' : function(event, template) {

    event.preventDefault();

    const productName = template.find('#productName').value;
    const barCode = template.find('#barCode').value;
    const calories = template.find('#calories').value;
    const fat = template.find('#fat').value;
    const protein = template.find('#protein').value;
    const carbohydrate = template.find('#carbohydrate').value;
    const ingredients = template.find('#ingredients').value;



    const newProduct = {
      productName: productName,
      barCode: barCode,
      calories: calories,
      fat: fat,
      protein: protein,
      carbohydrate:carbohydrate,
      ingredients:ingredients
    }

    Meteor.call('product.insert', newProduct);
    alert(`Added: ${newProduct.barCode} (${newProduct.productName})`);

  
  }
  });










