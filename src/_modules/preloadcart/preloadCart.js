'use strict';

let Preloadcart = function ( $, Backbone, _ ) {
  // console.log(Backbone);
  let
    // fnSelf = this,
    // Model-each unit comprises of this
    Service = Backbone.Model.extend({
      defaults:{
        title:'testing',
        price: 0,
        checked: false
      },

      type: 'Service',

      toggleCheck: function () {
        this.set('checked', !this.get('checked'));
      }
    }),

    // Collection- of such Service instances
    ServiceList = Backbone.Collection.extend({

      // collection based on this model
      model: Service,

      type: 'ServiceList',

      // get model instances with attribute checked=true
      getChecked: function () {
        // console.log(`checking ${this.type}`);
        return this.where({checked:true});
      }
    }),

    services = new ServiceList([
      		new Service({ title: 'web development', price: 200}),
      		new Service({ title: 'web design', price: 250}),
      		new Service({ title: 'photography', price: 100}),
      		new Service({ title: 'coffee drinking', price: 10})
      		// Add more here
    	]),

    // View of each Service model unit
    ServiceView = Backbone.View.extend({
      tagName: 'li',

      type: 'ServiceView',

      events: {
        'click': 'toggleService'
      },

      initialize: function () {
        // console.log(`initializing ${this.type}`);
        _.bindAll(this, 'toggleService', 'render');

        this.listenTo(this.model, 'change', this.render);
      },

      toggleService: function () {
        // console.log(this.model);
        this.model.toggleCheck();
      },

      render: function () {
        // console.log('rendering ServiceView this..');
        // console.log(this);
        let
          that = this;

        // console.log(this.$el.html());
        if (this.$el.html() === '') {
          let
            $frag = $(document.createDocumentFragment()),
            $htmlCheckbox = $('<input>', {
              type:'checkbox',
              value: 1,
              name: that.model.get('title'),
            }),
            $htmlSpan = $('<span>', {
              value: `\$${that.model.get('price')}`,
            });

          $frag.append(that.model.get('title'));
          $frag.append(` \$${that.model.get('price')}`);
          // $htmlCheckbox.append(that.model.get('title'));
          // $htmlCheckbox.append($htmlSpan);
          $frag.append($htmlCheckbox);
          $frag.append($htmlCheckbox);
          $htmlCheckbox.prop('checked', this.model.get('checked'));

          $frag.append($htmlCheckbox);
          this.$el.append($frag);
        }
        else {
          this.$('input').prop('checked', this.model.get('checked'));
        }

        return this;
      }
    }),

    App = Backbone.View.extend({
      el: $('#main'),

      type: 'App',

      initialize: function () {
        // listen on the collection instance of ServiceList, services
        // console.log(`initializing App ${this.type}`);
        let that = this;
        this.view;
        this.total = 0,
        this.collection = services;

        _.bindAll(this, 'render');

        this.listenTo(this.collection, 'change', this.render);

        this.collection.each( function(service) {
          that.view = new ServiceView({model: service});
          that.$('#services').append(that.view.render().el);
        });
      },

      render: function () {
        let that = this;

        this.total = 0;
        _(this.collection.getChecked()).each( function (model) {
          this.total += model.get('price');
        }, this);

        // console.log(`total price is ${this.total}`);
        this.$('#total-value').text(`\$${this.total}`);
      }
    }),

    AppView = new App();

  // new App();
  // return App;

};


export default Preloadcart;