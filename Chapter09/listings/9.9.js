/******************************************************************************
  Our plugin code comes first in this document. Normally, plugins would
  appear in separate files named jquery.plugin-name.js, but for our examples
  it's convenient to place this plugin code in the same JavaScript file as
  the code that calls it.
******************************************************************************/


/******************************************************************************
  :group()
  Select n elements, skip n elements, etc.
******************************************************************************/
(($) => {
  $.extend($.expr[':'], {
    group(element, index, matches) {
      const num = parseInt(matches[3], 10);

      return Number.isInteger(num) &&
        ($(element).index() - 1) % (num * 2) < num;
    }
  });
})(jQuery);


/******************************************************************************
  End plugin code; begin custom script code.
******************************************************************************/

$(() => {
  function stripe() {
    $('#news')
      .find('tr.alt')
      .removeClass('alt')
      .end()
      .find('tbody')
      .each((i, element) => {
        $(element)
          .children(':visible')
          .has('td')
          .filter(':group(3)')
          .addClass('alt');
      });
  }

  stripe();

  $('#topics a')
    .click((e) => {
      e.preventDefault();
      const topic = $(e.target).text();

      $(e.target)
        .addClass('selected')
        .siblings('.selected')
        .removeClass('selected');

      $('#news tr').show();
      if (topic != 'All') {
        $('#news')
          .find('tr:has(td)')
          .not((i, element) =>
            $(element)
              .children(':nth-child(4)')
              .text() == topic
          )
          .hide();
      }

      stripe();
    });
});
