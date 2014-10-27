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
      var date = $(event.target).find('[id=date]').val();
      var amount = $(event.target).find('[id=amount]').val();
      var category = $(event.target).find('[id=category]').val();
      var note = $(event.target).find('[id=note]').val();
      Items.insert({ 
        date: date,
        amount: amount,
        category: category,
        note: note
      });
    }
  });

  Template.list.events({
    'click li': function() {
      //Items.update({_id:this._id}, {$set:{done:!this.done}})
      Items.remove({_id:this._id});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
