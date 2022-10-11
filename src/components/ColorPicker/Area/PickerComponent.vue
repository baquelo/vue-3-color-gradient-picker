<template>
    <div class="picking-area" ref="pickerAreaRef" :style="pickerStyle" @mousedown="mouseEvents">
        <div class="picking-area-overlay1">
            <div class="picking-area-overlay2">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useGetRgbByHue } from "@/composables/useGetRgbByHue";
import { useMouseEvents } from "@/composables/useMouseEvents";
import { useChangePicker } from "@/composables/useChangePicker";

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
});

const width = ref(0);
const height = ref(0);
const mouseEvents = ref(() => { });
const pickerAreaRef = ref(null);

onMounted(() => {
    if (pickerAreaRef.value) {
        width.value = pickerAreaRef.value.clientWidth;
        height.value = pickerAreaRef.value.clientHeight;
    }
    
    mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler);
});

const offsetLeft = computed(() => {
    return ((props.saturation * width.value / 100) | 0) - 6;
});

const offsetTop = computed(() => {
    return (height.value - (props.value * height.value / 100) | 0) - 6;
});

const pointerStyle = computed(() => {
    return {
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        left: `${offsetLeft.value}px`,
        top: `${offsetTop.value}px`,
    }
});

const pickerStyle = computed(() => {
    const { red, green, blue } = useGetRgbByHue(props.hue);

    return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
});

function mouseDownHandler (event) {
    const { x: elementX, y: elementY } = pickerAreaRef.value.getBoundingClientRect();
    const startX = event.pageX;
    const startY = event.pageY;
    const positionX = startX - elementX;
    const positionY = startY - elementY;

    const color = useChangePicker(positionX, positionY, height.value, width.value, props.hue);

    console.log('mouseDownHandler:color', color);

    props.updateColor(color, 'onStartChange');
    return {
        startX,
        startY,
        positionX,
        positionY,

    };
}

function changeObjectPositions (event, { startX, startY, positionX, positionY }) {
    const moveX = event.pageX - startX;
    const moveY = event.pageY - startY;
    positionX += moveX;
    positionY += moveY;

    const color = useChangePicker(positionX, positionY, height.value, width.value, props.hue);

    return {
        positions: {
            positionX,
            positionY,
            startX: event.pageX,
            startY: event.pageY,
        },
        color,
    };
}

function mouseMoveHandler (event, { startX, startY, positionX, positionY, }) {
    const { positions, color } = changeObjectPositions(event, {
        startX, startY, positionX, positionY,
    });

    console.log('mouseMoveHandler:color', color);
    
    props.updateColor(color, 'onChange');

    return positions;
}

function mouseUpHandler (event, { startX, startY, positionX, positionY, }) {
    const { positions, color } = changeObjectPositions(event, {
        startX, startY, positionX, positionY,
    });

    console.log('mouseUpHandler:color', color);
 
    props.updateColor(color, 'onEndChange');

    return positions;
}
</script>
