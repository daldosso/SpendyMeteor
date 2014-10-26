Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Template.list.helpers({
    items: function() {
      return Items.find();  
    },
    doneClass: function() {
      if (this.done) {
        return 'done';
      } else {
        return '';
      }
    }
  });

  Template.controls.events({
    'submit form': function(event) {
      event.preventDefault();
      var description = $(event.target).find('[id=newItem]').val();
      Items.insert({ description: description });
    }
  });

  Template.list.events({
    'click li': function() {
      Items.update({_id:this._id}, {$set:{done:!this.done}})
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Items.find().count() == 0) {
      var items = [{
        description: 'Item 1'
      }, {
        description: 'Item 2'
      }];
      for (var i=0; i<items.length; i++) {
        Items.insert(items[i]);
      }
    }
  });
}
