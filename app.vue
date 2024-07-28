<template>
    <v-app class="main">
        <HeaderNav
            @save="saveShapes"
            :hasShapesInLocalStorage="hasShapesInLocalStorage"
            @load="loadShapes"
        />
        <ShapeCanvas
            :shapes="shapes"
            :connections="connections"
            :tempConnection="tempConnection"
            :containerWidth="containerWidth"
            :containerHeight="containerHeight"
            @updateShape="updateShape"
            @deleteShape="handleDeleteShape"
            @startConnection="startConnection"
            @updateTempConnection="updateTempConnection"
            @finishConnection="finishConnection"
        />
        <FloatingActionButton @toggle="toggleOptions" />
        <ShapeList :isOpen="isOpen" @shapeSelected="addShape" />
    </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useShapes } from '~/composables/useShapes';
import HeaderNav from '~/components/HeaderNav.vue';
import FloatingActionButton from '~/components/FloatingActionButton.vue';
import ShapeList from '~/components/ShapeList.vue';
import ShapeCanvas from '~/components/ShapeCanvas.vue';

const isOpen = ref(false);
const { shapes, connections, tempConnection, addShape, updateShape, deleteShape, startConnection, updateTempConnection, finishConnection, saveToLocalStorage, loadFromLocalStorage } = useShapes();
const hasShapesInLocalStorage = ref(false);
const containerWidth = ref(1000);
const containerHeight = ref(1000);

const updateContainerSize = () => {
    if (process.client) {
        containerWidth.value = window.innerWidth;
        containerHeight.value = window.innerHeight;
    }
};

const toggleOptions = (open) => {
    isOpen.value = open;
};

const saveShapes = () => {
    saveToLocalStorage();
    checkLocalStorage();
};

const loadShapes = () => {
    loadFromLocalStorage();
    checkLocalStorage();
    shapes.value = [...shapes.value];
    console.log('Shapes after loading:', shapes.value);
};

const checkLocalStorage = () => {
    if (process.client) {
        const savedShapes = localStorage.getItem('shapes');
        hasShapesInLocalStorage.value = savedShapes !== null;
    }
};

const handleDeleteShape = (index) => {
    deleteShape(index);
    saveToLocalStorage();
};

onMounted(() => {
    nextTick(() => {
        checkLocalStorage();
        loadFromLocalStorage();
        updateContainerSize();
    });
    if (process.client) {
        window.addEventListener('resize', updateContainerSize);
    }
});

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('resize', updateContainerSize);
    }
});
</script>

<style scoped>
.main {
    @apply bg-gray-200;
}
</style>