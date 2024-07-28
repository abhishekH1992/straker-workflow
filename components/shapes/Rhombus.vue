<template>
    <div class="shape-rhombus transform rotate-45 border-2 border-gray-500" :style="{ width: `${width}px`, height: `${height}px` }"></div>
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