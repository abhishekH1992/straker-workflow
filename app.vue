<template>
    <v-app class="main">
        <HeaderNav />
        <v-container class="relative">
            <div
                v-for="(shape, index) in shapes"
                :key="index"
                class="shape-container cursor-grab"
                :style="{ top: shape.top + 'px', left: shape.left + 'px', width: shape.width + 'px', height: shape.height + 'px', position: 'absolute' }"
                @mousedown="startDrag($event, index)"
                @touchstart="startDrag($event, index)"
                @click="showSettings(index, $event)"
            >
                <ShapeIcon :icon="shape.icon" :size="shape.size" />
                <ShapeSettingsCard
                    v-if="shape.showSettings"
                    :shape="shape"
                    :index="index"
                    @updateShape="updateShapeHandler"
                    @deleteShape="deleteShapeHandler"
                />
            </div>
        </v-container>
        <FloatingActionButton @toggle="toggleOptions" />
        <ShapeList :isOpen="isOpen" @shapeSelected="addShape" />
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useShapes } from '~/composables/useShapes';
import HeaderNav from '~/components/HeaderNav.vue';
import FloatingActionButton from '~/components/FloatingActionButton.vue';
import ShapeList from '~/components/ShapeList.vue';
import ShapeIcon from '~/components/ShapeIcon.vue';
import ShapeSettingsCard from '~/components/ShapeSettingsCard.vue';

const isOpen = ref(false);
const { shapes, addShape, updateShape, deleteShape } = useShapes();
const currentShapeIndex = ref(null);

const toggleOptions = (open) => {
    isOpen.value = open;
};

const showSettings = (index, event) => {
    shapes.value.forEach((shape, i) => shape.showSettings = i === index ? !shape.showSettings : false);
};

const updateShapeHandler = (index, updatedShape) => {
    const size = Math.max(updatedShape.width, updatedShape.height);
    updateShape(index, { ...updatedShape, size });
};

const deleteShapeHandler = (index) => {
    deleteShape(index);
};

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
        updateShape(index, { left: moveX - offsetX, top: moveY - offsetY });
    };

    const stopDrag = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', stopDrag);
        currentShapeIndex.value = null;
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', stopDrag);
};

const handleClickOutside = (event) => {
    const shapeContainers = document.querySelectorAll('.shape-container');
    const shapeCards = document.querySelectorAll('.shape-list-block');

    const isClickInsideShape = Array.from(shapeContainers).some(container => container.contains(event.target));
    const isClickInsideCard = Array.from(shapeCards).some(card => card.contains(event.target));

    if (!isClickInsideShape && !isClickInsideCard) {
        shapes.value.forEach(shape => shape.showSettings = false);
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
    .main {
        @apply bg-gray-200;
    }
    .shape-container {
        @apply p-2 absolute;
    }
</style>
