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

  var pageNum = 1;

  $(document)
    .on('nextPage', (e, scrollToVisible) => {
      if (pageNum > 19) {
        $('#more-photos').remove();
        return;
      }

      $.get($('#more-photos').attr('href'))
        .then((data) => {
          const $data = $(data)
            .appendTo('#gallery');

          if (scrollToVisible) {
            $(window)
              .scrollTop($data.offset().top);
          }

          checkScrollPosition();
        })
        .catch(({ statusText }) => {
          $('#gallery')
            .append(`<strong>${statusText}</strong>`)
        });
  });

  $(document)
    .on('nextPage', () => {
      if (pageNum < 20) {
        $('#more-photos')
          .attr('href', `pages/${++pageNum}.html`);
      }
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
        $(e.target).trigger('nextPage', [true]);
      });

    var scrolled = false;

    $(window)
      .scroll(() => {
        scrolled = true;
      });

    setInterval(() => {
      if (scrolled) {
        checkScrollPosition();
        scrolled = false;
      }
    }, 250);

    checkScrollPosition();
  });
})(jQuery);
