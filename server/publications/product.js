Meteor.publish( 'product', function( search ) {
  // check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { title: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { productName: regex }
      ]
    };
  }

  return Product.find( query, projection );
});