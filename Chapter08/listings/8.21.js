/******************************************************************************
  Our plugin code comes first in this document. Normally, plugins would
  appear in separate files named jquery.plugin-name.js, but for our examples
  it's convenient to place this plugin code in the same JavaScript file as
  the code that calls it.
******************************************************************************/

/******************************************************************************
  $.sum()
  Return the total of the numeric values in an array/object.
******************************************************************************/
(($) => {
  $.mathUtils = {
    sum: array =>
      array.reduce(
        (result, item) =>
          parseFloat($.trim(item)) + result,
        0
      ),
    average: array =>
      Array.isArray(array) ?
        $.mathUtils.sum(array) / array.length :
        ''
  };
})(jQuery);

/******************************************************************************
  .swapClass()
  Exchange one class for another on the selected elements.
******************************************************************************/
(($) => {
  $.fn.swapClass = function(class1, class2) {
    return this
      .each((i, element) => {
        const $element = $(element);

        if ($element.hasClass(class1)) {
          $element
            .removeClass(class1)
            .addClass(class2);
        }
        else if ($element.hasClass(class2)) {
          $element
            .removeClass(class2)
            .addClass(class1);
        }
      });
  };
})(jQuery);

/******************************************************************************
  .shadow()
  Create a shadow effect on any element by brute-force copying.
******************************************************************************/
(($) => {
  $.fn.shadow = function(opts) {
    const options = $.extend({}, $.fn.shadow.defaults, opts);

    return this.each((i, element) => {
      const $originalElement = $(element);

      for (let i = 0; i < options.copies; i++) {
        const offset = options.copyOffset(i);

        $originalElement
          .clone()
          .css({
            position: 'absolute',
            left: $originalElement.offset().left + offset.x,
            top: $originalElement.offset().top + offset.y,
            margin: 0,
            zIndex: -1,
            opacity: options.opacity
          })
          .appendTo('body');
      }
    });
  };

  $.fn.shadow.defaults = {
    copies: 5,
    opacity: 0.1,
    copyOffset: index => ({
      x: index,
      y: index
    })
  };
})(jQuery);

/******************************************************************************
  .tooltip()
  A simple jQuery UI tooltip widget.
******************************************************************************/
(($) => {
  $.widget('ljq.tooltip', {
    options: {
      offsetX: 10,
      offsetY: 10,
      content: element => $(element).data('tooltip-text')
    },
    _create() {
      this._super();
      this._tooltipDiv = $('<div/>')
        .addClass([
          'ljq-tooltip-text',
          'ui-widget',
          'ui-state-highlight',
          'ui-corner-all'
        ].join(' '))
        .hide()
        .appendTo('body');
      this.element
        .addClass('ljq-tooltip-trigger')
        .on('mouseenter.ljq-tooltip', () => { this._open(); })
        .on('mouseleave.ljq-tooltip', () => { this._close(); });
    },

    destroy() {
      this._tooltipDiv.remove();
      this.element
        .removeClass('ljq-tooltip-trigger')
        .off('.ljq-tooltip');
      this._superApply(arguments);
    },

    _open() {
      if (this.options.disabled) {
        return;
      }

      const elementOffset = this.element.offset();
      this._tooltipDiv
        .css({
          position: 'absolute',
          left: elementOffset.left + this.options.offsetX,
          top:
            elementOffset.top +
            this.element.height() +
            this.options.offsetY
        })
        .text(this.options.content(this.element))
        .show();
    },

    _close() {
      this._tooltipDiv.hide();
    }
  });
})(jQuery);
/******************************************************************************
  End plugin code; begin custom script code.
******************************************************************************/
$(() => {
  const $inventory = $('#inventory tbody');
  const quantities = $inventory
    .find('td:nth-child(2)')
    .map((index, qty) => $(qty).text())
    .get();
  const prices = $inventory
    .find('td:nth-child(3)')
    .map((index, qty) => $(qty).text())
    .get();
  const sum = $.mathUtils.sum(quantities);
  const average = $.mathUtils.average(prices);

  $('#sum')
    .find('td:nth-child(2)')
    .text(sum);
  $('#average')
    .find('td:nth-child(3)')
    .text(average.toFixed(2));
  $('table')
    .click(() => {
      $('tr').swapClass('one', 'two');
    });

  $.fn.shadow.defaults.copies = 10;
  $('h1')
    .shadow({
      copyOffset: index => ({
        x: -index,
        y: index
      })
    });

  $('a').tooltip();
});
