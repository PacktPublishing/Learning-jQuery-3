/******************************************************************************
  Our plugin code comes first in this document. Normally, plugins would
  appear in separate files named jquery.plugin-name.js, but for our examples
  it's convenient to place this plugin code in the same JavaScript file as
  the code that calls it.
******************************************************************************/

/******************************************************************************
  $.sum()
  Return the total of the numeric values in an array/object.
******************************************************************************/
(($) => {
  $.extend({
    sum: array =>
      array.reduce(
        (result, item) =>
          parseFloat($.trim(item)) + result,
        0
      ),
    average: array =>
      Array.isArray(array) ?
        $.sum(array) / array.length :
        ''
  });
})(jQuery);


/******************************************************************************
  End plugin code; begin custom script code.
******************************************************************************/
$(() => {
  const $inventory = $('#inventory tbody');
  const quantities = $inventory
    .find('td:nth-child(2)')
    .map((index, qty) => $(qty).text())
    .get();
  const prices = $inventory
    .find('td:nth-child(3)')
    .map((index, qty) => $(qty).text())
    .get();
  const sum = $.sum(quantities);
  const average = $.average(prices);

  $('#sum')
    .find('td:nth-child(2)')
    .text(sum);
  $('#average')
    .find('td:nth-child(3)')
    .text(average.toFixed(2));
});
