$(() => {
  const $speech = $('div.speech');

  $('#switcher-large')
    .click(function() {
      const num = parseFloat($speech.css('fontSize'));
      $speech.css('fontSize', `${num * 1.4}px`);
    });
});
