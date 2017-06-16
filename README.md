# Sticklr.js

Sticky side panel jQuery plugin

## Usage

```html
<!-- include the required CSS -->
<link rel="stylesheet" type="text/css" href="jquery-sticklr-1.4-light-color.css" />
                
<!-- include any version of jQuery before including plugin -->
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>

<!-- include the plugin -->
<script type="text/javascript" src="jquery-sticklr-1.4.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $('#example').sticklr();
    });
</script>

<ul id="example" class="sticklr">
    <li>
        <a href="#" class="icon-something" title="This is a floated icon"></a>
        <ul>
            <li class="sticklr-title">
                <a href="#">This is a title</a>
            </li>
            <li>
                <a href="http://www.google.com" class="icon-google">This is a link</a>
            </li>
            <li>
                <a href="http://www.facebook.com" class="icon-facebook">Another link</a>
            </li>
        </ul>
    </li>
</ul>
```

* General pattern: `ul > li > a[+ul > li a/form/table]`
* To ensure CSS3 fallback, the topmost `<ul>` element must have `"sticklr"` class name
* Create multiple column menu by adding another `<ul>` element in second level
* Add class `"sticklr-title"` in `<li>` to create menu title

To hide all shown menu when an event occured you can use:

```js
$().sticklr('hide');
```

## Options

| option | type | default | description |
| --- | --- | --- | --- |
| `animate` | `Boolean` | `false` | Define whether the sticky panel has to be animated when scrolling/resizing browser |
| `menuHeight` | `Number` | `20` | Define the height size of a column in pixel |
| `menuWidth` | `Number` | `180` | Define the width size of a column in pixel |
| `relativeTo` | `String` | `"center"` | Define vertical positioning relative to the browser viewport (`top`/`middle`/`ground`) |
| `relativeGap` | `Number` | `15` | Define the relative gap size in pixel if `relativeTo` was set to top or bottom |
| `showOn` | `String` | `"click"` | Define event when menu must be shown. Some possible mouse events: `hover`, `click`, `dblclick` |
| `stickTo` | `String` | `"left"` | Define placement position whether to `left` or `right` side |
| `tabHeight` | `Number` | `16` | Define the height size of the tab |
| `tabWidth` | `Number` | `16` | Define the width size of the tab |

To override the default value, you can pass custom values you want to change when initialize:

```js
$('#example').sticklr({
    animate     : true,
    menuHeight  : 20,
    menuWidth   : 200,
    relativeTo  : 'top',
    relativeGap : 10,
    showOn      : 'hover',
    stickTo     : 'right',
    tabHeight   : 64,
    tabWidth    : 32
});
```

## Credits

* Some icons used here are from icondock and pc.de

## License

Dual licensed under GPLv2 & MIT

Copyright © 2011-2012 Faisal Salman <<f@faisalman.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.