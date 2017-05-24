$.fx.speeds._default = 250;

$(() => {
  const $movable = $('<div/>')
    .attr('id', 'movable')
    .appendTo('body');

  const bioBaseStyles = {
    display: 'none',
    height: '5px',
    width: '25px'
  }

  const bioEffects = {
    duration: 800,
    easing: 'easeOutQuart',
    specialEasing: {
      opacity: 'linear'
    }
  };

  const showBio = (target) => {
    const $member = $(target).parent();
    const $bio = $member.find('p.bio');
    const startStyles = $.extend(
      {},
      bioBaseStyles,
      $member.offset()
    );
    const endStyles = {
      width: $bio.width(),
      top: $member.offset().top + 5,
      left: $member.width() + $member.offset().left - 5,
      opacity: 'show'
    };

    $movable
      .html($bio.clone())
      .css(startStyles)
      .animate(endStyles, bioEffects)
      .animate(
        { height: $bio.height() },
        { easing: 'easeOutQuart' }
      );
  };

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
          },{
            duration: 'slow',
            specialEasing: {
              top: 'easeInQuart'
            }
          });
      })
      .promise()
      .then(showBio);
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
