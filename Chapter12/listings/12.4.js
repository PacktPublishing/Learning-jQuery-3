/************************************************
  Table 1: Sorting by parsing cell contents.
************************************************/
$(() => {
  const comparator = (a, b) => a < b ? -1 : (a > b ? 1 : 0);
  const sortKey = (element, column) => {
    const $cell = $(element)
      .children('td')
      .eq(column);
    const sortText = $cell
      .find('span.sort-key')
      .text();
    const cellText = $cell
      .text()
      .toUpperCase();

    return $.trim(`${sortText} ${cellText}`);
  };

  $('#t-1')
    .find('thead th')
    .slice(1)
    .wrapInner($('<a/>').attr('href', '#'))
    .addClass('sort')
    .on('click', (e) => {
      e.preventDefault();

      const column = $(e.currentTarget).index();

      $('#t-1')
        .find('tbody > tr')
        .each((i, element) => {
          $(element)
            .data('sortKey', sortKey(element, column));
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
