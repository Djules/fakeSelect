# fakeSelect plugin <sup>[1.0.3](#march-15-2015)</sup>

fakeSelect is a jQuery plugin for skinning HTML select field, with native dropdown list (useful for mobile device).

How it works
------------

For this HTML:
```html
<label for="color">Choose a color:</label>
<select name="color" id="color">
    <option value="">-- choose --</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
    <option value="yellow">Yellow</option>
    <option value="purple">Purple</option>
    <option value="pink">Pink</option>
    <option value="black">Black</option>
    <option value="white">White</option>
</select>
```

With default options you'll get this:
```html
<label for="color">Choose a color:</label>
<span class="faux-select">
  <span class="faux-select-label faux-select-label-default">-- choose --</span>
  <select name="color" id="color">
      <option value="">-- choose --</option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="purple">Purple</option>
      <option value="pink">Pink</option>
      <option value="black">Black</option>
      <option value="white">White</option>
  </select>
</span>
```

Use the required style rules from the provided CSS file and pimp it as you wish!

Options
-------

Here are default options:

```js
{
  // use this as default label or set from the text of the first option with an empty value
  // <span> for label will gain an extra class 'faux-select-label-default' when default option is selected
  label: null,
  // base class added to customized selects
  class: 'faux-select',
  // set true to inherit original select's class name
  inheritClass: true,
  // if set to true, select's id is prefixed with 'fake-select-' and attached
  inheritID: false
}
```

Initialize
----------

Just include `jquery.fakeSelect.js` after [jQuery v1.7+](http://jquery.com).

fakeSelect supports only selects:

```js
// customize all selects
$('select').fakeSelect();
```
