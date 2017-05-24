$(() => {
  $('#switcher-default')
    .addClass('selected');

  $('#switcher button')
    .on('click', function() {
      const bodyClass = this.id.split('-')[1];

      $('body')
        .removeClass()
        .addClass(bodyClass);
      $('#switcher button')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });
});
