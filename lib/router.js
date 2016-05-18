Router.configure({layoutTemplate: 'layout'});

Router.route('/register');
Router.route('/productForm');
Router.route('/search');
Router.route('/food/:food', {
	name: "foodDetails",
	data: function(){
		let search = this.params.food;
		console.log(search);
		return Product.findOne({
			_id:search
		})
	}
});
Router.route('/foodItem');
Router.route('/userProfile');
Router.route('/allergyForm');
Router.route('/', {
	name: 'login',
    template: 'login'
});

