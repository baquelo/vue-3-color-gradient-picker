<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker :color="color" :onStartChange="color => onChange(color, 'start')"
        :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" />
    </div>
    <div>
      <ColorPicker :is-gradient="true" :onStartChange="color => onChange(color, 'start')"
        :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" />
    </div>
  </div>
</template>

<script setup>
import ColorPicker from '@/components';
import { ref } from 'vue';

const color = ref({
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1
});

function onChange (attrs, name) {
  this.color = { ...attrs };
}
</script>



<style src="@/index.scss" lang="scss" />
