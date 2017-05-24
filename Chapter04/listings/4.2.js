$(() => {
  const $speech = $('div.speech');
  $('#switcher-large')
    .click(() => {
      const num = parseFloat($speech.css('fontSize'));
    });
});
