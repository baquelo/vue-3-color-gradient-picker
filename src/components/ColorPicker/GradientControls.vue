<template>
    <div class="gradient-controls">
        <div class="gradient-type">
            <div :class="`gradient-type-item liner-gradient ${type === 'linear' ? 'active' : ''}`"
                @click="() => changeGradientControl({ type: 'linear' })" />
            <div :class="`gradient-type-item radial-gradient ${type === 'radial' ? 'active' : ''}`"
                @click="() => changeGradientControl({ type: 'radial' })" />
        </div>
        <div class="gradient-degrees-options" v-if="type === 'linear'">
            <div class="gradient-degrees" @mousedown="mouseEvents" @click="onClickGradientDegree">
                <div class="gradient-degree-center" :style="degreesStyle">
                    <div class="gradient-degree-pointer" />
                </div>
            </div>
            <div class="gradient-degree-value">
                <p>
                    {{degree}}&#176;
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMouseEvents } from "@/composables/useMouseEvents";
import { calculateDegree } from "@/helpers";
import { computed, onMounted, ref } from "vue";
import { useChangePicker } from "@/composables/useChangePicker";

const props = defineProps({
    type: String,
    degree: Number,
    changeGradientControl: {
        type: Function,
        default: () => { }
    }
});
// const disableClick = ref(false);
const mouseEvents = ref(() => { });

onMounted(() => {
    mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler);
});

const degreesStyle = computed(() => {
    return { transform: `rotate(${props.degree}deg)` };
});

function mouseDownHandler (event) {
    const pointer = event.target;
    const pointerBox = pointer.getBoundingClientRect();
    const centerY = pointerBox.top + parseInt(8 - window.pageYOffset, 10);
    const centerX = pointerBox.left + parseInt(8 - window.pageXOffset, 10);

    return {
        centerY,
        centerX,

    };
}

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
</script>