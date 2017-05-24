$(() => {
  $('#switcher-default').on('click', () => {
    $('body')
      .removeClass('narrow')
      .removeClass('large');
  });

  $('#switcher-narrow').on('click', () => {
    $('body')
      .addClass('narrow')
      .removeClass('large');
  });

  $('#switcher-large').on('click', () => {
    $('body')
      .removeClass('narrow')
      .addClass('large');
  });
});
