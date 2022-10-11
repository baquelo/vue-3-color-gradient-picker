import Picker from "./Picker/IndexComponent.vue";
import Preview from "./Preview/IndexComponent.vue";
import Hue from "./Hue/IndexComponent.vue";
import Alpha from "./Alpha/IndexComponent.vue";
import GradientPoints from "./GradientPoints/IndexComponent.vue";

export default {
    name: "Area",

    props: {
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
    },

    components: {
        Picker,
        GradientPoints,
        Preview,
        Hue,
        Alpha
    },
}
