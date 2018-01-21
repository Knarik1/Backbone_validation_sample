var FeedBack = Backbone.Model.extend({
    url: '/feedback',

    defaults: {
        email: '',
        website: '',
        feedback: ''
    },

    validate: function(attr) {
        var errors = {};

        if(!attr.email) {
            errors.email = 'Please fill email field.';
        }

        if(!attr.feedback) {
            errors.feedback = 'Please fill feedback field.';
        }

        if(!_.isEmpty(errors)) {
            return errors;
        }
    },

    initialize: function() {
        this.on('invalid', this.errorMessaging, this);
    },

    errorMessaging: function(model, error) {
        console.log(error);
    }
});


var FeedBackFormView = Backbone.View.extend({
    className: 'row',

    template: _.template($('#form-template').html()),

    render: function() {
        this.$el.html(this.template);
        return this;
    },

    initialize: function() {
      this.listenTo(this.model, 'invalid', this.showErrors)
    },

    events: {
        'click #submit': 'submitClicked'
    },

    showErrors: function(errors) {
        _.each(errors.validationError, function (error, key) {
            var formGroup = this.$('#' + key).parent();
            formGroup.addClass('has-error');
            formGroup.find('.help-block').html(error);
        }, this);
    },

    hideErrors: function () {
        this.$('.form-group').removeClass('has-error');
        this.$('.help-block').text('');
    },

    submitClicked: function(e) {
        e.preventDefault();
        var self = this;

        var options = {
            success: function() {
                console.log('Success');
            },

            error: function (model, error) {
                self.hideErrors();
                console.log(error);
            }
        };

        var feedback = {
            email: this.$('#email').val(),
            website: this.$('#website').val(),
            feedback: this.$('#feedback').val()
        };

        this.model.save(feedback, options);


    }
});

