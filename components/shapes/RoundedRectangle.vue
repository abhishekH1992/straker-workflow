<template>
    <div class="shape-rounded-rectangle rounded-lg border-2 border-gray-500" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    width: {
        type: Number,
        default: 16
    },
    height: {
        type: Number,
        default: 8
    }
});
</script>  