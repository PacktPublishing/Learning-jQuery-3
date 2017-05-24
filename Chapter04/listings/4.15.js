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
});
