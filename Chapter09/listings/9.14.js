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
  :column()
  Select all table cells in the same column as the one specified.
******************************************************************************/
(($) => {
  $.fn.column = function() {
    var $cells = $();

    this.each(function(i, element) {
      const $td = $(element).closest('td, th');

      if ($td.length) {
        const colNum = $td[0].cellIndex + 1;
        const $columnCells = $td
          .closest('table')
          .find('td, th')
          .filter(`:nth-child(${colNum})`);

        $cells = $cells.add($columnCells);
      }
    });
    
    return this.pushStack($cells);
  };
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

  $('#release')
    .nextAll()
    .addBack()
    .addClass('highlight');

  $('#news td')
    .click((e) => {
      $(e.target)
        .siblings('.active')
        .removeClass('active')
        .end()
        .column()
        .addClass('active');
    });
});
