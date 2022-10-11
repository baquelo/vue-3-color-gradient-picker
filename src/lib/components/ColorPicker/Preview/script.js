import Hex from './Hex/IndexComponent.vue';
import RGB from './RGB/IndexComponent.vue';

export default {
    name: "Preview",

    props: {
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function,
    },

    components: {
        Hex,
        RGB
    }
};
