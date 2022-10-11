# color-picker

`ColorPicker` is a component that allows you to select a color or a gradient color.

```vue
<template>
  <div id="app">
    <ColorPicker
      :color="color"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />
  </div>
</template>
```