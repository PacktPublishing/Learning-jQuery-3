$.fx.speeds._default = 250;

$(() => {
  const showDetails = ({ currentTarget }) => {
    $(currentTarget)
      .siblings('.active')
      .removeClass('active')
      .children('div')
      .fadeOut()
      .end()
      .end()
      .addClass('active')
      .find('div')
      .css({
        display: 'block',
        left: '-300px',
        top: 0
      })
      .each((i, element) => {
        $(element)
          .animate({
            left: 0,
            top: 25 * i
          });
      });
  };

  $('#fx-toggle')
    .show()
    .on('click', () => {
      $.fx.off = !$.fx.off;
    });

  $('div.member')
    .on('mouseenter mouseleave', ({ type, currentTarget }) => {
      const width = height = type == 'mouseenter' ?
        85 : 75;
      const paddingTop = paddingLeft = type == 'mouseenter' ?
        0 : 5;

      $(currentTarget)
        .find('img')
        .stop()
        .animate({
          width,
          height,
          paddingTop,
          paddingLeft
        });
    })
    .click(showDetails);
});
