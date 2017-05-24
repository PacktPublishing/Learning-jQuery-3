/******************************************************************************
  Normally, tests would appear in a separate file named
  test/test.js, but for our examples it's convenient to place this
  test code in the same JavaScript file as the code that calls it.
******************************************************************************/

QUnit.module('Selecting');

QUnit.test('Child Selector', (assert) => {
  assert.expect(1);
  const topLis = $('#selected-plays > li.horizontal');
  assert.equal(topLis.length, 3, 'Top LIs have horizontal class');
});

QUnit.test('Attribute Selectors', (assert) => {
  assert.expect(0);
});

QUnit.module('Ajax');

/******************************************************************************
  End test code; begin custom script code.
******************************************************************************/
