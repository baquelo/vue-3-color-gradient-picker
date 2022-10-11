<template>
    <div>Marcelo</div>
    <GradientControls :type="gradientType" :degree="gradientDegree" :changeGradientControl="changeGradientControl" />

    <Area :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :hue="colorHue"
        :saturation="colorSaturation" :value="colorValue" :updateColor="updateColor" :is-gradient="true"
        :type="gradientType" :degree="gradientDegree" :points="gradientPoints" :activePointIndex="activePointIndex"
        :changeGradientControl="changeGradientControl" :changeActivePointIndex="changeActivePointIndex"
        :updateGradientLeft="updateGradientLeft" :addPoint="addPoint" :removePoint="removePoint" />

    <Preview :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :updateColor="updateColor" />
</template>

<script setup>
import GradientControls from '@/components/ColorPicker/GradientControls.vue';
import Preview from '@/components/ColorPicker/Preview/PreviewComponent.vue';
import Area from '@/components/ColorPicker/Area/AreaComponent.vue';

import { getRightValue, rgbToHsv, generateGradientStyle } from "@/helpers";
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'linear'
    },
    degree: {
        type: Number,
        default: 0
    },
    points: {
        type: Array,
        default: () => {
            return [
                {
                    left: 0,
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 1,
                },
                {
                    left: 100,
                    red: 255,
                    green: 0,
                    blue: 0,
                    alpha: 1,
                },
            ];
        }
    },
    onStartChange: Function,
    onChange: Function,
    onEndChange: Function,
});

const activePointIndex = ref(0);
const gradientPoints = ref(props.points);
const activePoint = ref(props.points[0])
const colorRed = ref(props.points[0].red)
const colorGreen = ref(props.points[0].green)
const colorBlue = ref(props.points[0].blue)
const colorAlpha = ref(props.points[0].alpha)
const colorHue = ref(0)
const colorSaturation = ref(100)
const colorValue = ref(100)
const gradientType = ref(props.type)
const gradientDegree = ref(props.degree)
const actions = ref({
    onStartChange: props.onStartChange,
    onChange: props.onChange,
    onEndChange: props.onEndChange,
});

onMounted(() => {
    const { hue, saturation, value } = rgbToHsv({ red: colorRed.value, green: colorGreen.value, blue: colorBlue.value });

    colorHue.value = hue;
    colorSaturation.value = saturation;
    colorValue.value = value;

    document.addEventListener('keyup', keyUpHandler);
});

onBeforeUnmount(() => {
    document.removeEventListener('keyup', keyUpHandler);
});

function removePoint (index = activePointIndex.value) {
    if (gradientPoints.value.length <= 2) {
        return;
    }

    gradientPoints.value.splice(index, 1);


    if (index > 0) {
        activePointIndex.value = index - 1;
    }

    props.onChange && props.onChange({
        points: gradientPoints.value,
        type: gradientType.value,
        degree: gradientDegree.value,
        style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
    });
}

function keyUpHandler (event) {
    if ((event.keyCode === 46 || event.keyCode === 8)) {
        removePoint(activePointIndex.value);
    }
}

function changeActivePointIndex (index) {
    activePointIndex.value = index;

    activePoint.value = gradientPoints.value[index];

    const { red, green, blue, alpha } = activePoint.value;

    colorRed.value = red;
    colorGreen.value = green;
    colorBlue.value = blue;
    colorAlpha.value = alpha;

    const { hue, saturation, value } = rgbToHsv({ red, green, blue });

    colorHue.value = hue;
    colorSaturation.value = saturation;
    colorValue.value = value;
}

function changeGradientControl ({ type, degree }) {
    type = getRightValue(type, gradientType.value);
    degree = getRightValue(degree, gradientDegree.value);

    gradientType.value = type;
    gradientDegree.value = degree;

    props.onChange({
        points: gradientPoints.value,
        type: gradientType.value,
        degree: gradientDegree.value,
        style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
    })
}

function updateColor ({ red, green, blue, alpha, hue, saturation, value }, actionName = 'onChange') {
    red = getRightValue(red, colorRed);
    green = getRightValue(green, colorGreen);
    blue = getRightValue(blue, colorBlue);
    console.log('alpha', alpha);
    console.log('colorAlpha', colorAlpha);
    alpha = getRightValue(alpha, colorAlpha);
    hue = getRightValue(hue, colorHue);
    saturation = getRightValue(saturation, colorSaturation);
    value = getRightValue(value, colorValue);

    const localGradientPoints = gradientPoints.value.slice();

    localGradientPoints[activePointIndex.value] = {
        ...localGradientPoints[activePointIndex.value],
        red,
        green,
        blue,
        alpha,
    };

    console.log('alpha', alpha);

    colorRed.value = red;
    colorGreen.value = green;
    colorBlue.value = blue;
    colorAlpha.value = alpha;
    colorHue.value = hue;
    colorSaturation.value = saturation;
    colorValue.value = value;
    gradientPoints.value = localGradientPoints;

    const action = actions[actionName];

    action && action({
        points: localGradientPoints,
        type: gradientType.value,
        degree: gradientDegree.value,
        style: generateGradientStyle(localGradientPoints, gradientType.value, gradientDegree.value),
    });
}

function updateGradientLeft (left, index, actionName = 'onChange') {
    gradientPoints.value[index].left = left;

    const action = actions[actionName];

    action && action({
        points: gradientPoints.value,
        type: gradientType.value,
        degree: gradientDegree.value,
        style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
    });
}

function addPoint (left) {
    gradientPoints.value.push({
        ...gradientPoints.value[activePointIndex.value],
        left,
    });

    activePointIndex.value = gradientPoints.value.length - 1;

    props.onChange && props.onChange({
        points: gradientPoints.value,
        type: gradientType.value,
        degree: gradientDegree.value,
        style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
    });
}
</script>
