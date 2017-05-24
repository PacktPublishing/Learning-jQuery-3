(($) => {
  $(document)
    .on('mouseenter mouseleave', 'div.photo', (e) => {
      const $details = $(e.currentTarget).find('.details');

      if (e.type == 'mouseenter') {
        $details.fadeTo('fast', 0.7);
      } else {
        $details.fadeOut('fast');
      }
    });

  $(document)
    .on('nextPage', (e) => {
      $.get($('#more-photos').attr('href'))
        .then((data) => {
          $('#gallery')
            .append(data);
          checkScrollPosition();
        })
        .catch(({ statusText }) => {
          $('#gallery')
            .append(`<strong>${statusText}</strong>`)
        });
  });

  var pageNum = 1;

  $(document)
    .on('nextPage', () => {
      if (pageNum > 19) {
        $('#more-photos').remove();
        return;
      }

      $('#more-photos')
        .attr('href', `pages/${++pageNum}.html`);
    });

  const checkScrollPosition = () => {
    const distance = $(window).scrollTop()
      + $(window).height();

    if ($('#container').height() <= distance) {
      $(document).trigger('nextPage');
    }
  }

  $(() => {
    $('#more-photos')
      .click((e) => {
        e.preventDefault();
        $(e.target).trigger('nextPage');
      });

    $(window)
      .scroll(checkScrollPosition)
      .trigger('scroll');
  });
})(jQuery);
