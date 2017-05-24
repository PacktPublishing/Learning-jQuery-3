$(() => {
  $('#switcher-default')
    .addClass('selected');

  $('#switcher button')
    .on('click', function() {
      $('body')
        .removeClass();
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
  });

  $('#switcher-narrow')
    .on('click', () => {
      $('body')
        .addClass('narrow');
    });

  $('#switcher-large')
    .on('click', () => {
      $('body')
        .addClass('large');
    });
});
