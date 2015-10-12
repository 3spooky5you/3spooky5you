if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {content = '<iframe width="560" height="315" src="https://www.youtube.com/embed/n_qbGJuxCYY?autoplay=1" frameborder="0" allowfullscreen></iframe>'
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      id = spooks.insert({
        "created": new Date (),
        "user": Meteor.user().profile.name,
        "userId": Meteor.userId()
      });
    }
  });

  Template.ghost.helpers({
    scaryContent: function () {
      count = Counts.get("spooks");
      if (count >= 0){
        content = '<img src="pacman.gif">'
      }
      if (count > 10){
        content = '<iframe width="560" height="315" src="https://www.youtube.com/embed/n_qbGJuxCYY?autoplay=1" frameborder="0" allowfullscreen></iframe>'
      }
      if (count > 50){
         content = '<iframe width="560" height="315" src="https://www.youtube.com/embed/XTgFtxHhCQ0?autoplay=1" frameborder="0" allowfullscreen></iframe>'
      }
      if (count > 75){
        content = '<iframe width="420" height="315" src="https://www.youtube.com/embed/Zd04SwR2eU8?autoplay=1" frameborder="0" allowfullscreen></iframe>'
      }
      if (count > 150){
        content = '<iframe width="420" height="315" src="https://www.youtube.com/embed/NV4xo_rF-oo?autoplay=1" frameborder="0" allowfullscreen></iframe>'
      }
      return content;
    }
  });

  Template.spookiness.helpers({
    spookyWords: function () {
      count = Counts.get("spooks");
      words = "lets get spooky";
      if (count > 10) {
        words = "2 spooky 4 me";
      }
      if (count > 25) {
        words = "A skeleton can do better!";
      }
      if (count > 75) {
        words = "2 spoopy 4 me";
      }
      if (count > 100) {
        words = "a skeleton can do better";
      }
      if (count > 200) {
        words = "SPOOKY SKELETON TIME!!!!";
      }
      if (count > 250){
        words = "u so spooky";
      }
      if (count > 300){
        words = "ᐃ";
      }
      if (count > 350){
        words = "spookiness intensifies";
      }
      if (count > 400){
        words = "wow ur spooky"
      }
      if (count > 450){
        words = "soooo spooky"
      }
      return words;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    spooks._ensureIndex({created: 1},{expireAfterSeconds: 3});
  });

  Meteor.publish('spooksWithCount', function() {
    Counts.publish(this, 'spooks', spooks.find(), { noReady: true });
    return spooks.find({}, { limit: 10 });
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("spooksWithCount");
}
