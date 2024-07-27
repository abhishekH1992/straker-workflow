<template>
    <div class="shape-icon" :style="iconStyle">
        <MdiIcon :icon="icon" />
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: [String, Number],
        default: 24
    },
    icon: {
        type: String,
    }
});
const iconStyle = computed(() => ({
    fontSize: `${props.size}px`,
    lineHeight: `${props.size}px`,
}));
</script>

<style scoped>
    .shape-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
  