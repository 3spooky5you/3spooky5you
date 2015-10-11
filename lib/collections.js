spooks= new Mongo.Collection("spooks");

spooks.allow({ 
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
