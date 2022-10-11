<template>
    <div class="picker-area">
        <Picker :red="red" :green="green" :blue="blue" :hue="hue" :saturation="saturation" :value="value"
            :updateColor="updateColor" />

        <GradientPoints v-if="isGradient" :type="type" :degree="degree" :points="points"
            :activePointIndex="activePointIndex" :changeActivePointIndex="changeActivePointIndex"
            :updateGradientLeft="updateGradientLeft" :addPoint="addPoint" :removePoint="removePoint" />

        <div class="preview">
            <Preview :red="red" :green="green" :blue="blue" :alpha="alpha" :isGradient="isGradient" :points="points"
                :gradientDegree="degree" :gradientType="type" />

            <div class="color-hue-alpha">
                <Hue :hue="hue" :saturation="saturation" :value="value" :updateColor="updateColor" />
                <Alpha :alpha="alpha" :red="red" :green="green" :blue="blue" :updateColor="updateColor" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Picker from "@/components/ColorPicker/Area/PickerComponent.vue";
import Preview from "./Preview/IndexComponent.vue";
import Hue from "./Hue/IndexComponent.vue";
import Alpha from "@/components/ColorPicker/Area/AlphaComponent.vue";
import GradientPoints from "./GradientPoints/IndexComponent.vue";

// const props = 
defineProps({
    isGradient: Boolean,
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
    points: Array,
    degree: Number,
    type: String,
    activePointIndex: Number,
    changeGradientControl: Function,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function,
});
</script>
