$(() => {
  $('#more-photos')
    .click((e) => {
      e.preventDefault();
      const url = $(e.target).attr('href');

      $.get(url)
        .then((data) => {
          $('#gallery')
            .append(data);
        })
        .catch(({ statusText }) => {
          $('#gallery')
            .append(`<strong>${statusText}</strong>`)
        });
    });
});
