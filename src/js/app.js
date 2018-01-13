document.addEventListener('DOMContentLoaded', () => {
  cheet('c s s r', () => {
    $('link[rel="stylesheet"]').filter(() => this.getAttribute('href') === '/css/theme.min.css').remove();
    $('css-loading').replaceWith($(document.createElement('x-zangief')).addClass('js-loading loading is-hidden'));
  });

  $('#js-parse').on('click', () => {
    const $loading = $('.js-loading');
    $loading.removeClass('is-hidden');

    const url = encodeURIComponent($('#js-target').val());
    fetch(`/api/cssr?url=${url}`).then(response => response.json()).then(data => {
      const list = [];
      data.cssUrls.forEach(url => {
        const $li = $('<li>');
        $li.attr('href', url);
        $li.attr('target', '_blank');
        $li.text(url);
        list.push($li);
      });
      $('#js-css-list').empty().append(list);

      const selectors = data.result.selectors;
      const resultItemList = [];
      Object.keys(selectors).forEach(selector => {
        const status = selectors[selector];
        const isUnused = status.matches_html === 0;
        const isDuplicate = status.occurences_css > 1;

        if (isUnused || isDuplicate) {
          const resultItem = document.createElement('result-item');
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

      $('#js-result-list').empty().append(resultItemList);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      $loading.addClass('is-hidden');
    });
  });
});
