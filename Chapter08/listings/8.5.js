/******************************************************************************
  $.sum()
  Return the total of the numeric values in an array/object.
******************************************************************************/
(($) => {
  $.sum = array =>
    array.reduce(
      (result, item) =>
        parseFloat($.trim(item)) + result,
      0
    );

  $.average = array =>
    Array.isArray(array) ?
      $.sum(array) / array.length :
      '';
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
