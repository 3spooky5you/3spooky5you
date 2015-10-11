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
        "created": new Date ()
      });
      console.log(id)
    }
  });

  Template.spookiness.helpers ({
    spookyWords: function () {
      count = Counts.get("spooks");
      words = "a little spooky";
      if (count > 10) {
        words = "spooky spooky eek";
      }
      if (count > 20) {
        words = "spooky scary ooooh";
      }
      if (count > 30) {
        words = "spooky scary scary";
      }
      if (count > 50) {
        words = "very very spooky scary";
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
