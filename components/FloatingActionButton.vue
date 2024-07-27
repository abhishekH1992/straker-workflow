<template>
    <v-btn
        fab
        class="floating-action-button"
        :class="{ rotate: isOpen }"
        @click="toggleOptions"
    >
        <v-icon>{{ isOpen ? 'mdi-close' : 'mdi-plus' }}</v-icon>
    </v-btn>
</template>
  
<script setup>
import { ref, defineEmits, onMounted, onBeforeUnmount } from 'vue';
  
const emit = defineEmits(['toggle']);
const isOpen = ref(false);
  
const toggleOptions = () => {
    isOpen.value = !isOpen.value;
    emit('toggle', isOpen.value);
}
const handleClickOutside = (event) => {
    const button = document.querySelector('.floating-action-button');
    const list = document.querySelector('.options-list');
    if (button && !button.contains(event.target) && list && !list.contains(event.target)) {
        isOpen.value = false;
        emit('toggle', isOpen.value);
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
  
<style scoped>
    .floating-action-button {
        @apply fixed bottom-5 left-5 z-50 bg-theme-brand text-white rounded-full w-10 h-10 flex items-center justify-center p-8 transition-transform duration-300 ease-in
    }
    .rotate {
        @apply transform rotate-180;
    }
</style>
  