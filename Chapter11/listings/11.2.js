$(() => {
  $('div.member')
    .on('mouseenter mouseleave', ({ type, target }) => {
      const width = height = type == 'mouseenter' ?
        85 : 75;
      const paddingTop = paddingLeft = type == 'mouseenter' ?
        0 : 5;

      $(target)
        .find('img')
        .not(':animated')
        .animate({
          width,
          height,
          paddingTop,
          paddingLeft
        });
    });
});
