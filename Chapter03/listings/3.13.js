$(() => {
  const toggleHover = (e) => {
    $(e.target)
      .toggleClass('hover');
  };

  $('#switcher h3')
    .hover(toggleHover, toggleHover);
});

$(() => {
  $('#switcher')
    .click((e) => {
      $(e.currentTarget)
        .children('button')
        .toggleClass('hidden');
    });
});

$(() => {
  $('#switcher-default')
    .addClass('selected');

  $('#switcher button')
    .click((e) => {
      const bodyClass = e.target.id.split('-')[1];

      $('body')
        .removeClass()
        .addClass(bodyClass);
      $(e.target)
        .addClass('selected')
        .siblings('button')
        .removeClass('selected');

      e.stopPropagation();
    });
});
