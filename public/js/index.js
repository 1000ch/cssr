$(function () {
  FastClick.attach(document.body);

  var $button = $('button');
  var $input = $('input');
  var $resultList = $('#js-result-list');
  var resultItemTemplate = document.querySelector('#js-result-item-template');

  $button.on('click', function () {
    console.log('button is clicked');
    $.ajax({
      url: '/api/cssr',
      method: 'get',
      data: {
        url: $input.val()
      }
    }).done(function (data) {
      
      var errors = data.load_errors;
      var selectors = data.selectors;

      var items = [];
      var clone = null;
      Object.keys(selectors).forEach(function (selector) {
        clone = document.importNode(resultItemTemplate.content, true);
        clone.querySelector('code').textContent = selector;
        items.push(clone);
      });

      $resultList.empty().append(items);

      console.log(data);
    }).fail(function (jqXHR, status, error) {
      console.log(error);
    });
  });
});