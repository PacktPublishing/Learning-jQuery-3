$(() => {
  $('#letter-a a')
    .click((e) => {
      e.preventDefault()

      $('#dictionary')
        .load('a.html');
    });
});
