import CSSLoading from '/webcomponents/css-loading.js';
import ResultList from '/webcomponents/result-list.js';
import ResultItem from '/webcomponents/result-item.js';
import XZangief from '/webcomponents/x-zangief.js';

customElements.define('css-loading', CSSLoading);
customElements.define('result-list', ResultList);
customElements.define('result-item', ResultItem);
customElements.define('x-zangief', XZangief);

document.addEventListener('DOMContentLoaded', () => {
  cheet('c s s r', () => {
    $('link[rel="stylesheet"]').filter((i, element) => element.getAttribute('href') === '/css/theme.css').remove();
    const zangief = document.createElement('x-zangief');
    zangief.type = XZangief.types[Math.floor(Math.random() * XZangief.types.length)]
    $('css-loading').replaceWith($(zangief).addClass('js-loading loading is-hidden'));
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
