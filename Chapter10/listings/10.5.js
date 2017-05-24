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
    .on('mouseover mouseout', (e) => {
    const $target = $(e.target)
      .closest('div.photo');
    const $related = $(e.relatedTarget)
      .closest('div.photo');
    const $details = $target
      .find('.details');

    if (e.type == 'mouseover' && $target.length) {
      $details.fadeTo('fast', 0.7);
    } else if (e == 'mouseout' && !$related.length) {
      $details.fadeOut('fast');
    }
  });
});
