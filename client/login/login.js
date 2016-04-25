import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './login.html';

Template.register.events({
    'submit form': function(event){
       event.preventDefault();
        var firstName = $('[name=firstName]').val();
        var lastName = $('[name=lastName]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
        	firstName: firstName,
        	lastName: lastName,
            email: email,
            password: password
        },function(error){
		    if(error){
		        console.log(error.reason); // Output error if registration fails
		    } else {
		        Router.go("login"); // Redirect user if registration succeeds
		    }
        });
    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
		    } else {
		        Router.go("foodItem");
		    }
		});
    }
});

Template.login.onRendered(function(){
    $('.login').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "You must enter an email address."
            }
        }
    });
});

Template.register.onRendered(function(){
    $('.register').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "You must enter an email address."
            }
        }
    });
});








