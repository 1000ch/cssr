$(function () {

  // Cheet
  cheet('↓ r ↑ l y b x a', function () {
    // remove default theme
    $('link[rel="stylesheet"]').filter(function () {
      return this.getAttribute('href') === '/css/theme.min.css';
    }).remove();

    // replace loading icon with him
    var $zangief = $(document.createElement('x-zangief'));
    $zangief.addClass('js-loading loading is-hidden');
    $('css-loading').replaceWith($zangief);
  });

  // Cheet
  cheet('c s s r', function () {
    // remove default theme
    $('link[rel="stylesheet"]').filter(function () {
      return this.getAttribute('href') === '/css/theme.min.css';
    }).remove();

    // replace loading icon with him
    var $zangief = $(document.createElement('x-zangief'));
    $zangief.addClass('js-loading loading is-hidden');
    $('css-loading').replaceWith($zangief);
  });

  // Bindings
  var $navigation = $('nav[role=navigation]');
  var $cssList = $('#js-css-list');
  var $button = $('#js-parse');
  var $input = $('#js-target');
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

      var cssUrls = data.cssUrls;

      var list = [];
      cssUrls.forEach(function (url) {
        var $li = $('<li>');
        $li.attr('href', url);
        $li.attr('target', '_blank');
        $li.text(url);
        list.push($li);
      });
      $cssList.empty().append(list);

      var errors = data.result.load_errors;
      var selectors = data.result.selectors;

      var resultItemList = [];
      Object.keys(selectors).forEach(function (selector) {

        var resultItem;
        var status = selectors[selector];
        var isUnused = status.matches_html === 0;
        var isDuplicate = status.occurences_css > 1;

        if (isUnused || isDuplicate) {
          resultItem = document.createElement('result-list-item');
          resultItem.textContent = selector;
          resultItem.className = 'line';
          if (isUnused) {
            resultItem.setAttribute('unused', isUnused);
          }
          if (isDuplicate) {
            resultItem.setAttribute('duplicate', isDuplicate);
          }
          resultItem.setAttribute('count', status.occurences_css);
          resultItemList.push(resultItem);
        }
      });

      $resultList.empty().append(resultItemList);

    }).fail(function (jqXHR, status, error) {

      console.log(error);

    }).always(function () {

      $loading.addClass('is-hidden');

    });
  });
});