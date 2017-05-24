$(() => {
  $('#letter-a a')
    .click((e) => {
      e.preventDefault()

      $('#dictionary')
        .load('a.html');
    });

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
            </div>
          </div>
        `, '');

        $('#dictionary')
          .html(html);
      });
    });
});
