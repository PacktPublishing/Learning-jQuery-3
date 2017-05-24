/************************************************
  Set up table headings.
************************************************/
$(() => {
  $('table')
    .each((i, table) => {
      $('<h3/>', {
        'class': 'table-title',
        id: `table-title-${i}`,
        text: `Table ${i + 1}`,
        data: { index: i },
        click(e) {
          e.preventDefault();
          $(table).fadeToggle();
        },
        css: { glowColor: '#00ff00', cursor: 'pointer' }
      }).insertBefore(table);
    });
});

/************************************************
  Table 1: Sorting by parsing cell contents.
************************************************/
$(() => {
  const comparator = (a, b, direction = 1) =>
    a < b ?
      -direction :
      (a > b ? direction : 0);
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

      const $target = $(e.currentTarget);
      const column = $target.index();
      const keyType = $target.data('keyType');
      const sortDirection = $target.hasClass('sorted-asc') ?
        -1 : 1;

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
          $(b).data('sortKey'),
          sortDirection
        ))
        .forEach((element) => {
          $(element)
            .parent()
            .append(element);
        });

      $target
        .siblings()
        .addBack()
        .removeClass('sorted-asc sorted-desc')
        .end()
        .end()
        .addClass(
          sortDirection == 1 ?
            'sorted-asc' : 'sorted-desc'
        );
    });
});


/************************************************
  Table 2: Sorting by reading HTML5 data.
************************************************/
$(() => {
  const comparator = (a, b, direction = 1) =>
    a < b ?
      -direction :
      (a > b ? direction : 0);

  $('#t-2')
    .find('thead th')
    .slice(1)
    .wrapInner($('<a/>').attr('href', '#'))
    .addClass('sort')
    .on('click', (e) => {
      e.preventDefault();

      const $target = $(e.currentTarget);
      const column = $target.index();
      const sortKey = $target.data('sort').key;
      const sortDirection = $target.hasClass('sorted-asc') ?
        -1 : 1;

      $('#t-2')
        .find('tbody > tr')
        .get()
        .sort((a, b) => comparator(
          $(a).data('book')[sortKey],
          $(b).data('book')[sortKey],
          sortDirection
        ))
        .forEach((element) => {
          $(element)
            .parent()
            .append(element);
        });

      $target
        .siblings()
        .addBack()
        .removeClass('sorted-asc sorted-desc')
        .end()
        .end()
        .addClass(
          sortDirection == 1 ?
            'sorted-asc' : 'sorted-desc'
        );
    });
});

/************************************************
  Table 3: Sorting by recreating HTML from JSON.
************************************************/
(($) => {
  const buildAuthors = (row, separator = ', ') =>
    row
      .authors
      .map(a => `${a.first_name} ${a.last_name}`)
      .join(separator);

  const buildRow = row =>
    `
      <tr>
        <td><img src="images/${row.img}"></td>
        <td>${row.titleFormatted}</td>
        <td>${row.authorsFormatted}</td>
        <td>${row.published}</td>
        <td>$${row.price}</td>
      </tr>
    `;

  const prepRows = rows =>
    rows
      .map(row => $.extend({}, row, {
        title: row.title.toUpperCase(),
        titleFormatted: row.title,
        authors: buildAuthors(row, ' ').toUpperCase(),
        authorsFormatted: buildAuthors(row)
      }));

  const buildRows = rows =>
    rows
      .map(buildRow)
      .join('');

  Promise.all([$.getJSON('books.json'), $.ready])
    .then(([json]) => {
      $('#t-3')
        .find('tbody')
        .html(buildRows(prepRows(json)));

      const comparator = (a, b, direction = 1) =>
        a < b ?
          -direction :
          (a > b ? direction : 0);

      $('#t-3')
        .find('thead th')
        .slice(1)
        .wrapInner($('<a/>').attr('href', '#'))
        .addClass('sort')
        .on('click', (e) => {
          e.preventDefault();

          const $target = $(e.currentTarget);
          const column = $target.index();
          const sortKey = $target.data('sort').key;
          const sortDirection = $target.hasClass('sorted-asc') ?
            -1 : 1;
          const content = buildRows(
            prepRows(json).sort((a, b) => comparator(
              a[sortKey],
              b[sortKey],
              sortDirection
            ))
          );

          $('#t-3')
            .find('tbody')
            .html(content);

          $target
            .siblings()
            .addBack()
            .removeClass('sorted-asc sorted-desc')
            .end()
            .end()
            .addClass(
              sortDirection == 1 ?
                'sorted-asc' : 'sorted-desc'
            );
        });
    })
    .catch((err) => {
      console.error(err);
    });
})(jQuery);
