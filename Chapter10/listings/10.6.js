$(() => {
  var pageNum = 1;

  $('#more-photos')
    .click((e) => {
      e.preventDefault();
      const $link = $(e.target);
      const url = $link.attr('href');

      if (pageNum > 19) {
        $link.remove();
        return;
      }

      $link.attr('href', `pages/${++pageNum}.html`);

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

    $('#gallery')
      .on('mouseenter mouseleave', 'div.photo', (e) => {
        const $details = $(e.currentTarget).find('.details');

        if (e.type == 'mouseenter') {
          $details.fadeTo('fast', 0.7);
        } else {
          $details.fadeOut('fast');
        }
      });
});
