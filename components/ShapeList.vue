<template>
    <div v-if="isOpen" class="shape-list" elevation="4">
        <div class="text-gray-500 p-4 pb-2 text-sm">Shapes</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-3 gap-4 p-4">
            <div v-for="(shape, index) in shapes" :key="index" class="shape-list-item">
                <v-tooltip bottom :text="shape.name">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" icon class="shape-btn" @click="selectShape(shape)">
                            <ShapeIcon :size="shape.size" :icon="shape.icon" />
                        </div>
                    </template>
                    <span>{{ shape.name }}</span>
                </v-tooltip>
            </div>
        </div>
        <div class="text-gray-500 p-4 pb-2 text-sm">Line</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-3 gap-4 p-4">
            <div v-for="(line, index) in lines" :key="index" class="shape-list-item">
                <v-tooltip bottom :text="line.name">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" icon class="shape-btn" @click="selectShape(line)">
                            <ShapeIcon :size="line.size" :icon="line.icon" />
                        </div>
                    </template>
                    <span>{{ line.name }}</span>
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
    { name: 'Rectangle', icon: 'rectangle-outline', size: 30 },
    { name: 'Square', icon: 'square-outline', size: 30 },
    { name: 'Rounded Square', icon: 'square-rounded-outline', size: 30 },
    { name: 'Circle', icon: 'circle-outline', size: 30 },
    { name: 'Triangle', icon: 'triangle-outline', size: 30 },
    { name: 'Rhombus', icon: 'rhombus-outline', size: 30 },
    { name: 'Cube', icon: 'cube-outline', size: 30 },
    { name: 'Hexagon', icon: 'hexagon-outline', size: 30 },
    { name: 'Octagon', icon: 'octagon-outline', size: 30 },
    { name: 'Pentagon', icon: 'pentagon-outline', size: 30 },
];

const lines = [
    { name: 'Line', icon: 'minus', size: 30 },
    { name: 'Vector Line', icon: 'vector-line', size: 30 },
    { name: 'Arrow Up', icon: 'arrow-up', size: 30 },
    { name: 'Arrow Right', icon: 'arrow-right', size: 30 },
    { name: 'Arrow Bottpm', icon: 'arrow-down', size: 30 },
    { name: 'Arrow Left', icon: 'arrow-left', size: 30 },
    { name: 'Two Directional Arrow', icon: 'arrow-left-right-bold-outline', size: 30 },
];

const selectShape = (item) => {
    emit('shapeSelected', item);
};
</script>

<style scoped>
    .shape-list {
        @apply fixed bottom-20 left-5 bg-white rounded-lg shadow-lg z-50;
    }
    .shape-list-item {
        @apply flex items-center justify-center p-2;
    }
    .shape-list-item:hover {
        @apply bg-theme-transparentBg cursor-pointer;
    }
</style>
