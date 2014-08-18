$(function () {
  FastClick.attach(document.body);

  var $button = $('button');
  var $input = $('input');

  $button.on('click', function () {
    console.log('button is clicked');
    $.ajax({
      url: '/api/cssr',
      method: 'get',
      data: {
        url: $input.val()
      }
    }).done(function (data) {
      console.log(data);
    }).fail(function (jqXHR, status, error) {
      console.log(error);
    });
  });
});