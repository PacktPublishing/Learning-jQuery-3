$(() => {
  $('#selected-plays > li')
    .addClass('horizontal');

  $('#selected-plays li:not(.horizontal)')
    .addClass('sub-level');

  $('#selected-plays > li')
    .addClass('big-letter');

  $('#selected-plays li.horizontal')
    .addClass('big-letter');

  $('#selected-plays li:not(.sub-level)')
    .addClass('big-letter');

});
