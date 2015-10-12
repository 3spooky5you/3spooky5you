if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
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
      content = "Boo"
      if (count > 10){
        content = "ghost"
      }
      if (count > 25){
        content = "zombie!"
      }
      if (count > 100) {
        content = '<iframe width="560" height="315" src="https://www.youtube.com/embed/n_qbGJuxCYY?autoplay=1" frameborder="0" allowfullscreen></iframe>';
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
      if (count > 20) {
        words = "3 spooky 5 me";
      }
      if (count > 30) {
        words = "2 spoopy 4 me";
      }
      if (count > 50) {
        words = "a skeleton can do better";
      }
      if (count > 70) {
        words = "ᐃ";
      }
      if (count > 90){
        words = "u so spooky";
      }
      if (count > 100){
        words = "spooky scary skeleton time!!!!!!!!!!!!!!!!";
      }
      if (count > 150){
        words = "spookiness intensifies";
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
