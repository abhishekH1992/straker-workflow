<template>
    <v-app class="main">
        <!-- <HeaderNav /> -->
        <v-container class="relative">
            <div 
                v-for="(shape, index) in shapes" 
                :key="index" 
                class="shape-container cursor-grab" 
                :style="{ top: shape.top + 'px', left: shape.left + 'px', position: 'absolute' }" 
                @mousedown="startDrag($event, index)" 
                @touchstart="startDrag($event, index)"
            >
                <ShapeIcon :icon="shape.icon" :size="150" />
            </div>
        </v-container>
        <FloatingActionButton @toggle="toggleOptions" />
        <ShapeList :isOpen="isOpen" @shapeSelected="addShape" />
    </v-app>
</template>
  
<script setup>
import { ref } from 'vue';
import HeaderNav from '~/components/HeaderNav.vue';
import FloatingActionButton from '~/components/FloatingActionButton.vue';
import ShapeList from '~/components/ShapeList.vue';
import ShapeIcon from '~/components/ShapeIcon.vue';

const isOpen = ref(false);
const shapes = ref([]);
const currentShapeIndex = ref(null);
  
const toggleOptions = (open) => {
    isOpen.value = open;
}

const addShape = (shape) => {
    shapes.value.push({
        ...shape,
        top: 100,
        left: 100,
    });
}

const startDrag = (event, index) => {
    currentShapeIndex.value = index;
    const shapeElement = event.target.closest('.shape-container');
    const startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
    const rect = shapeElement.getBoundingClientRect();
    const offsetX = startX - rect.left;
    const offsetY = startY - rect.top;
    const move = (moveEvent) => {
        const moveX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
        const moveY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;
        shapes.value[currentShapeIndex.value].left = moveX - offsetX;
        shapes.value[currentShapeIndex.value].top = moveY - offsetY;
    }
    const stopDrag = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', stopDrag);
        currentShapeIndex.value = null;
    }
  
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', stopDrag);
}
</script>

<style scoped>
    .main {
        @apply bg-gray-200;
    }
    .shape-container {
        @apply p-2;
        position: absolute;
    }
</style>
  