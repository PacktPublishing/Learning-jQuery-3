$(() => {
  const toggleHover = (e) => {
    $(e.target)
      .toggleClass('hover');
  };

  $('#switcher')
    .hover(toggleHover, toggleHover);
});

$(() => {
  $('#switcher-default')
    .addClass('selected');
  $('#switcher')
    .on('click', 'button', (e) => {
      const bodyClass = e.target.id.split('-')[1];

      $('body')
        .removeClass()
        .addClass(bodyClass);
      $(e.target)
        .addClass('selected')
        .siblings('button')
        .removeClass('selected');

      e.stopPropagation();
    })
    .on('click', (e) => {
      $(e.currentTarget)
        .children('button')
        .toggleClass('hidden');
    });
});
