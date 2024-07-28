<template>
    <div v-if="isOpen" class="shape-list" elevation="4">
        <div class="text-gray-500 p-4 pb-2 text-sm">Shapes</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-6 xl:grid-cols-4 gap-2 xl:gap-4 px-4 py-2 xl:p-4">
            <div v-for="(shape, index) in shapes" :key="index" class="shape-list-item">
                <v-tooltip>
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="shape-btn" @click="selectShape(shape)">
                            <ShapeIcon :size="shape.size" :icon="shape.icon" />
                        </div>
                    </template>
                    <span>{{ shape.name }}</span>
                </v-tooltip>
            </div>
        </div>
        <div class="text-gray-500 p-4 pb-2 text-sm">Typography</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-6 xl:grid-cols-4 gap-2 xl:gap-4 px-4 py-2 xl:p-4">
            <div v-for="(typo, index) in typography" :key="index" class="shape-list-item">
                <v-tooltip>
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="shape-btn" @click="selectShape(typo)">
                            <ShapeIcon :size="typo.size" :icon="typo.icon" />
                        </div>
                    </template>
                    <span>{{ typo.name }}</span>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ShapeIcon from './ShapeIcon.vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['shapeSelected']);

const shapes = [
    { name: 'Rectangle', icon: 'mdiRectangleOutline', size: 30 },
    { name: 'Square', icon: 'mdiSquareOutline', size: 30 },
    { name: 'Rounded Square', icon: 'mdiSquareRoundedOutline', size: 30 },
    { name: 'Circle', icon: 'mdiCircleOutline', size: 30 },
    { name: 'Triangle', icon: 'mdiTriangleOutline', size: 30 },
    { name: 'Rhombus', icon: 'mdiRhombusOutline', size: 30 },
    { name: 'Cube', icon: 'mdiCubeOutline', size: 30 },
    { name: 'Hexagon', icon: 'mdiHexagonOutline', size: 30 },
    { name: 'Octagon', icon: 'mdiOctagonOutline', size: 30 },
    { name: 'Pentagon', icon: 'mdiPentagonOutline', size: 30 },
];
  
const typography = [
    { name: 'Text', icon: 'mdiTextRecognition', size: 30 },
];
  
const selectShape = (item) => {
    emit('shapeSelected', item);
};
</script>

<style scoped>
    .shape-list {
        @apply fixed bottom-20 left-2 md:left-5 bg-white rounded-lg shadow-lg z-50;
    }
    .shape-list-item {
        @apply flex items-center justify-center p-2;
    }
    .shape-list-item:hover {
        @apply bg-theme-transparentBg cursor-pointer;
    }
</style>
  