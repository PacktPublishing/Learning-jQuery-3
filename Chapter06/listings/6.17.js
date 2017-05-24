$(() => {
  $('#letter-a a')
    .click((e) => {
      e.preventDefault()

      $('#dictionary')
        .hide()
        .load('a.html', function(content) {
          $(this).fadeIn()
        });
    });

  $('#letter-b a')
    .click((e) => {
      const formatAuthor = entry =>
        entry.author ?
          `<div class="quote-author">${entry.author}</div>` :
          '';

      const formatQuote = entry =>
        entry.quote ?
          `
          <div class="quote">
            ${entry.quote.reduce((result, q) => `
              ${result}
              <div class="quote-line">${q}</div>
            `, '')}
            ${formatAuthor(entry)}
          </div>
          ` : '';

      e.preventDefault();

      $.getJSON('b.json', (data) => {
        const html = data.reduce((result, entry) => `
          ${result}
          <div class="entry">
            <h3 class="term">${entry.term}</h3>
            <div class="part">${entry.part}</div>
            <div class="definition">
              ${entry.definition}
              ${formatQuote(entry)}
            </div>
          </div>
        `, '');

        $('#dictionary')
          .html(html);
      });
    });

  $('#letter-c a')
    .click((e) => {
      e.preventDefault();
      $.getScript('c.js');
    });

  $('#letter-d a')
    .click((e) => {

      const formatAuthor = entry =>
        $(entry).attr('author') ?
          `<div class="quote-author">
            ${$(entry).attr('author')}
          </div>` :
          '';

      const formatQuote = entry =>
        $(entry).find('quote').length ?
          `
          <div class="quote">
            ${$(entry)
                .find('quote')
                .get()
                .reduce((result, q) => `
                  ${result}
                  <div class="quote-line">
                    ${$(q).text()}
                  </div>
                `, '')}
            ${formatAuthor(entry)}
          </div>
          ` : '';

      e.preventDefault();

      $.get('d.xml', (data) => {
        const html = $(data)
          .find('entry')
          .get()
          .reduce((result, entry) => `
            ${result}
            <div class="entry">
              <h3 class="term">${$(entry).attr('term')}</h3>
              <div class="part">${$(entry).attr('part')}</div>
              <div class="definition">
                ${$(entry).find('definition').text()}
                ${formatQuote(entry)}
              </div>
            </div>
          `, '');

        $('#dictionary')
          .html(html);
      });
    });

  $('#letter-e a')
    .click((e) => {
      e.preventDefault();

      const requestData = {
        term: $(e.target).text()
      };

      $.get('notfound', requestData, (data) => {
        $('#dictionary').html(data);
      }).fail((xhr) => {
        $('#dictionary')
          .html(`An error occurred:
            ${xhr.status}
            ${xhr.responseText}
          `);
      });
    });

  $('#letter-f form')
    .submit((e) => {
      e.preventDefault();

      $.post(
        $(e.target).attr('action'),
        $(e.target).serialize(),
        (data) => { $('#dictionary').html(data); }
      );
    });

  const $loading = $('<div/>')
    .attr('id', 'loading')
    .text('Loading...')
    .insertBefore('#dictionary');

  $(document)
    .ajaxStart(() => {
      $loading.show();
    })
    .ajaxStop(() => {
      $loading.hide();
    });

  $('body')
    .on('click', 'h3.term', (e) => {
      $(e.target)
        .siblings('.definition')
        .slideToggle();
    });
});
