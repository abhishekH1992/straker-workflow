<template>
    <div class="shape-rectangle border-2 border-gray-500" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    width: {
        type: Number,
        default: 20
    },
    height: {
        type: Number,
        default: 20
    }
});
</script>
