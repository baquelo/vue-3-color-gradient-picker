<template>
    <div @mousedown="mouseEvents" class="alpha">
        <div class="gradient" :style="style" />
        <div class="alpha-area">
            <div class="alpha-mask" ref="alphaMaskRef">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { getAlpha } from "@/helpers";
import { useMouseEvents } from "@/composables/useMouseEvents";
import { computed, onMounted, ref } from "vue";
import { useChangePicker } from "@/composables/useChangePicker";

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});

const width = ref(0);
const mouseEvents = ref(() => { });
const alphaMaskRef = ref(null);

onMounted(() => {
    if (alphaMaskRef.value) {
        width.value = alphaMaskRef.value.clientWidth;
    }

    mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler);
});

function mouseMoveHandler (event, { startX, positionX }) {
    const { positions, alpha } = changeObjectPositions(event, { startX, positionX });

    updateColor({ alpha }, 'onChange');

    return positions;
}

function mouseUpHandler (event, { startX, positionX, }) {
    const { positions, alpha } = changeObjectPositions(event, { startX, positionX });

    updateColor({ alpha }, 'onEndChange');

    return positions;
}

function changeObjectPositions (event, { startX, startY, positionX, positionY }) {
    const moveX = event.pageX - startX;
    const moveY = event.pageY - startY;
    positionX += moveX;
    positionY += moveY;

    const color = useChangePicker(positionX, positionY, height, width, hue);

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

const offsetLeft = computed(() => {
    return ((props.alpha * width.value) | 0) - 6;
});

const pointerStyle = computed(() => {
    return { left: `${offsetLeft.value}px`, }
});

const style = computed(() => {
    return {
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${props.red}, ${props.green}, ${props.blue}))`,
    }
});

function mouseDownHandler (event) {
    const elementX = event.currentTarget.getBoundingClientRect().x;
    const startX = event.pageX;
    const positionX = startX - elementX;

    updateColor({ alpha: getAlpha(positionX, width) }, 'onStartChange');

    return {
        startX,
        positionX,

    };
}
</script>
