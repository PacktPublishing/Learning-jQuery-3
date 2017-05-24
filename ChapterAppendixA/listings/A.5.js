/******************************************************************************
  Normally, tests would appear in a separate file named
  test/test.js, but for our examples it's convenient to place this
  test code in the same JavaScript file as the code that calls it.
******************************************************************************/

QUnit.module('Selecting', {
  beforeEach() {
    this.topLis = $('#selected-plays > li.horizontal');
  }
});

QUnit.test('Child Selector', function(assert) {
  assert.expect(1);
  assert.equal(this.topLis.length, 3, 'Top LIs have horizontal class');
});

QUnit.test('Attribute Selectors', function(assert) {
  assert.expect(2);
  assert.ok(this.topLis.find('.mailto').length == 1, 'a.mailto');
  assert.equal(this.topLis.find('.pdflink').length, 1, 'a.pdflink');
});

QUnit.module('Ajax');

/******************************************************************************
  End test code; begin custom script code.
******************************************************************************/
$(() => {
  $('#selected-plays > li').addClass('horizontal');
  $('a[href^="mailto:"]').addClass('mailto');
  $('a[href$=".pdf"]').addClass('pdflink');
});
