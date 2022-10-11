<template>
    <Input :value="hexValue" label="hex" @input="changeHex" :onFocus="() => inProgress = true"
        :onBlur="() => inProgress = false" :inProgress="inProgress" classes="hex" />
</template>

<script setup>
import { Input } from "@/components/UI";

import { rgbToHex, hexToRgb } from "@/helpers";
import { ref, computed, watch } from "vue";

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});

const inProgress = ref(false);
const hexValue = ref(rgbToHex(props.red, props.green, props.blue));

const hex = computed(() => {
    return rgbToHex(props.red, props.green, props.blue)
});

watch(() => inProgress, setHex);
watch(() => props.red, setHex);
watch(() => props.green, setHex);
watch(() => props.blue, setHex);

function setHex () {
    if (inProgress.value) {
        return;
    }

    hexValue.value = hex.value;
}

function changeHex (event) {
    const color = hexToRgb(event.target.value);

    if (color) {
        props.updateColor(color);
    }
}
</script>
