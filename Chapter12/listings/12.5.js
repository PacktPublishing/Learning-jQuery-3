/************************************************
  Table 1: Sorting by parsing cell contents.
************************************************/
$(() => {
  const comparator = (a, b) => a < b ? -1 : (a > b ? 1 : 0);
  const sortKeys = {
    date: $cell => Date.parse(`1 ${$cell.text()}`),
    alpha: $cell => $.trim(
      $cell.find('span.sort-key').text() + ' ' +
      $cell.text().toUpperCase()
    ),
    numeric($cell) {
      const key = parseFloat(
        $cell
          .text()
          .replace(/^[^\d.]*/, '')
      );
      return isNaN(key) ? 0 : key;
    }
  };

  $('#t-1')
    .find('thead th')
    .slice(1)
    .each((i, element) => {
      $(element).data(
        'keyType',
        element.className.replace(/^sort-/,'')
      );
    })
    .wrapInner($('<a/>').attr('href', '#'))
    .addClass('sort')
    .on('click', (e) => {
      e.preventDefault();

      const column = $(e.currentTarget).index();
      const keyType = $(e.currentTarget).data('keyType');

      $('#t-1')
        .find('tbody > tr')
        .each((i, element) => {
          $(element).data(
            'sortKey',
            sortKeys[keyType](
              $(element)
                .children('td')
                .eq(column)
            )
          );
        })
        .get()
        .sort((a, b) => comparator(
          $(a).data('sortKey'),
          $(b).data('sortKey')
        ))
        .forEach((element) => {
          $(element)
            .parent()
            .append(element);
        });
    });
});
