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
      $speech.css(
        'fontSize',
        `${sizeMap[e.target.id](num)}px`
      );
    });

  $('a.more')
    .click((e) => {
      e.preventDefault();

      if ($firstPara.is(':hidden')) {
        $firstPara
          .fadeIn('slow');
        $(e.target)
          .text('read less');
      } else {
        $firstPara
          .fadeOut('slow');
        $(e.target)
          .text('read more');
      }
    });
});
