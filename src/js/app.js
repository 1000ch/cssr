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

    const url = encodeURIComponent($input.val());

    fetch(`/api/cssr?url=${url}`).then(response => response.json()).then(data => {

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
          resultItem = document.createElement('result-item');
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

    }).catch(function (jqXHR, status, error) {

      console.log(error);

    }).finally(function () {

      $loading.addClass('is-hidden');

    });
  });
});
