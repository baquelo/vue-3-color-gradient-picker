<template>
    <div class="color-preview-area">
        <div class="input-group">
            <!-- <Hex :red="red" :green="green" :blue="blue" :updateColor="updateColor" /> -->
            <!-- <RGB :red="red" :green="green" :blue="blue" :alpha="alpha" :updateColor="updateColor" /> -->
        </div>
    </div>
</template>

<script setup>
import Hex from './Hex/HexComponent.vue';
import RGB from './RGB/IndexComponent.vue';

// const props = 
defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});
</script>
