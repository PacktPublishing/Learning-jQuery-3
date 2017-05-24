$(() => {
  const toggleHover = (e) => {
    $(e.target)
      .toggleClass('hover');
  };

  $('#switcher')
    .hover(toggleHover, toggleHover);
});

$(() => {
  const toggleSwitcher = (e) => {
    if (!$(e.target).is('button')) {
      $(e.currentTarget)
        .children('button')
        .toggleClass('hidden');
    }
  };

  $('#switcher')
    .on('click', toggleSwitcher)
    .click();

  $('#switcher button')
    .click((e) => {
      $('#switcher')
        .off('click', toggleSwitcher);

      if (e.target.id == 'switcher-default') {
        $('#switcher')
          .on('click', toggleSwitcher);
      }
    });
});

$(() => {
  $('#switcher-default')
    .addClass('selected');
  $('#switcher')
    .click((e) => {
    if ($(e.target).is('button')) {
      const bodyClass = e.target.id.split('-')[1];

      $('body')
        .removeClass()
        .addClass(bodyClass);
      $(e.target)
        .addClass('selected')
        .siblings('button')
        .removeClass('selected');
    }
  });
});

$(() => {
  const triggers = {
    D: 'default',
    N: 'narrow',
    L: 'large'
  };

  $(document)
    .keyup((e) => {
      const key = String.fromCharCode(e.which);

      if (key in triggers) {
        $(`#switcher-${triggers[key]}`)
          .click();
      }
    });
});
