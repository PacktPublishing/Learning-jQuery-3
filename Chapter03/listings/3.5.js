$(() => {
  $('#switcher-default')
    .addClass('selected')
    .on('click', () => {
      $('body')
        .removeClass();
    });

  $('#switcher-narrow')
    .on('click', () => {
      $('body')
        .removeClass()
        .addClass('narrow');
    });

  $('#switcher-large')
    .on('click', () => {
      $('body')
        .removeClass()
        .addClass('large');
    });

  $('#switcher button')
    .on('click', function() {
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });
});
