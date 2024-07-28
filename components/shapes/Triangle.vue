<template>
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
        <polygon
            :points="`${width/2},0 ${width},${height} 0,${height}`"
            fill="none"
            :stroke="borderColor"
            :stroke-width="borderWidth"
        />
    </svg>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    width: {
        type: Number,
        default: 100
    },
    height: {
        type: Number,
        default: 100
    },
    borderWidth: {
        type: Number,
        default: 2
    },
    borderColor: {
        type: String,
        default: 'gray'
    }
});
</script>