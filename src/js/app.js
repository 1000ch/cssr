$(function () {

  // FastClick
  FastClick.attach(document.body);

  // Cheet
  cheet('↓ r ↑ l y b x a', function () {
    // remove default theme
    $('link[rel="stylesheet"]').filter(function () {
      return this.getAttribute('href') === '/css/theme.min.css';
    }).remove();

    // add him
    var $zangief = $('<x-zangief>');
    $zangief.addClass('js-loading loading is-hidden');
    $('css-loading').replaceWith($zangief);
  });
  
  // Bindings
  var $button = $('button');
  var $input = $('input');
  var $resultList = $('#js-result-list');

  $button.on('click', function () {

    var $loading = $('.js-loading');
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
        if (selectors[selector].matches_html === 0) {
          html += '<result-list-item unused class="line">' + selector + '</result-list-item>';
        } else if (selectors[selector].occurences_css > 1) {
          html += '<result-list-item duplicated class="line">' + selector + '</result-list-item>';
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