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

      $.getJSON('b.json');
    });
});
