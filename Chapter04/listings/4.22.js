$(() => {
  const sizeMap = {
    'switcher-small': n => n / 1.4,
    'switcher-large': n => n * 1.4,
    'switcher-default': () => defaultSize
  };

  const $speech = $('div.speech');
  const $firstPara = $('p')
    .eq(1)
    .hide();

  const defaultSize = parseFloat($speech.css('fontSize'));

  $('#switcher button')
    .click((e) => {
      const num = parseFloat($speech.css('fontSize'));
      $speech.animate({
        fontSize: `${sizeMap[e.target.id](num)}px`
      });
    });

  $('a.more')
    .click((e) => {
      e.preventDefault();

      $firstPara
        .animate({
          opacity: 'toggle',
          height: 'toggle'
        }, 'slow');
      $(e.target)
        .text(
          $(e.target).text() === 'read more' ?
            'read less' : 'read more'
        );
    });

  $('div.label')
    .click((e) => {
      const $switcher = $(e.target)
        .parent();
      const paraWidth = $('div.speech p')
        .outerWidth();
      const switcherWidth = $switcher
        .outerWidth();

      $switcher
        .css('position', 'relative')
        .fadeTo('fast', 0.5)
        .animate(
          { left: paraWidth - switcherWidth },
          { duration: 'slow', queue: false }
        )
        .fadeTo('slow', 1.0)
        .slideUp('slow')
        .queue((next) => {
          $switcher.css('backgroundColor', '#f00');
          next();
        })
        .slideDown('slow');
    });
});
