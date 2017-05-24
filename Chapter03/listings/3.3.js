$(() => {
  $('#switcher-default')
    .addClass('selected')
    .on('click', function() {
      $('body')
        .removeClass('narrow')
        .removeClass('large');
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });

  $('#switcher-narrow')
    .on('click', function() {
      $('body')
        .addClass('narrow')
        .removeClass('large');
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });

  $('#switcher-large')
    .on('click', function() {
      $('body')
        .removeClass('narrow')
        .addClass('large');
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });
});
