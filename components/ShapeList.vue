<template>
    <div v-if="isOpen" class="shape-list" elevation="4">
        <div class="text-gray-500 p-4 pb-2 text-sm">Shapes</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-6 xl:grid-cols-4 gap-2 xl:gap-4 px-4 py-2 xl:p-4">
            <div v-for="(shape, index) in shapes" :key="index" class="shape-list-item">
                <v-tooltip>
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="shape-btn" @click="selectShape(shape)">
                            <component :is="shape.component" :width="shape.size" :height="shape.size" />
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
                            <div>T</div> <!-- Placeholder for text icon -->
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
import Circle from './shapes/Circle.vue';
import Rectangle from './shapes/Rectangle.vue';
import Parallelogram from './shapes/Parallelogram.vue';
import RoundedRectangle from './shapes/RoundedRectangle.vue';
import Rhombus from './shapes/Rhombus.vue';
import Triangle from './shapes/Triangle.vue';
import Process from './shapes/Process.vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['shapeSelected']);

const shapes = [
    { name: 'Rectangle', component: Rectangle, size: 30 },
    { name: 'Rounded Rectangle', component: RoundedRectangle, size: 30 },
    { name: 'Circle', component: Circle, size: 30 },
    { name: 'Parallelogram', component: Parallelogram, size: 30 },
    { name: 'Process', component: Process, size: 30 },
    { name: 'Rhombus', component: Rhombus, size: 30 },
    { name: 'Triangle', component: Triangle, size: 30 },
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
    .shape-btn {
        @apply w-full h-full flex items-center justify-center;
    }
</style>