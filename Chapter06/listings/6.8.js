$(() => {
  $('#letter-a a')
    .click((e) => {
      e.preventDefault()

      $('#dictionary')
        .load('a.html');
    });

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

  $('#letter-b a')
    .click((e) => {
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
      e.preventDefault();
      $.get('d.xml', (data) => {

      });
    });
});
