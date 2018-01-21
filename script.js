$(function() {
    var model = new FeedBack();
    var view = new FeedBackFormView({model: model});

    $('#app').html(view.render().el);
});