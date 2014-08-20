$(function () {
  FastClick.attach(document.body);

  var $loading = $('#js-loading');
  var $button = $('button');
  var $input = $('input');
  var $resultList = $('#js-result-list');
  var resultItemTemplate = document.querySelector('#js-result-item-template');

  $button.on('click', function () {

    $loading.removeClass('is-hidden');

    $.ajax({
      url: '/api/cssr',
      method: 'get',
      data: {
        url: $input.val()
      }
    }).done(function (data) {
      
      var errors = data.load_errors;
      var selectors = data.selectors;

      var html = '';
      Object.keys(selectors).forEach(function (selector) {
        html += '<result-list-item>' + selector + '</result-list-item>';
      });

      $resultList.empty().append(html);

    }).fail(function (jqXHR, status, error) {

      console.log(error);

    }).always(function () {

      $loading.addClass('is-hidden');

    });
  });
});