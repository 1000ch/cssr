$(function () {
  // FastClick
  FastClick.attach(document.body);

  // Cheet
  cheet('↓ r ↑ l y b x a', function () {
    alert('(´･谷･`)');
  });
  
  // Bindings
  var $loading = $('#js-loading');
  var $button = $('button');
  var $input = $('input');
  var $resultList = $('#js-result-list');

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
        if (data.selectors[selector].matches_html === 0) {
          html += '<result-list-item class="line">' + selector + '</result-list-item>';
        }
      });

      $resultList.empty().append(html);

    }).fail(function (jqXHR, status, error) {

      console.log(error);

    }).always(function () {

      $loading.addClass('is-hidden');

    });
  });
});