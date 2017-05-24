$(() => {
  $('#switcher h3')
    .click(function() {
      $(this)
        .siblings('button')
        .toggleClass('hidden');
    });
});

$(() => {
  $('#switcher-default')
    .addClass('selected');

  $('#switcher button').click(function() {
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
