<template>
    <div
        v-if="isOpen"
        class="shape-list"
        elevation="4"
    >
        <div class="grid grid-cols-3 gap-4 p-4">
            <div
                v-for="(shape, index) in shapes"
                :key="index"
                class="shape-list-item"
            >
                <v-tooltip bottom :text="shape.name">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" icon class="shape-btn">
                            <component :is="shape.component" :width="shape.width" :height="shape.height" />
                        </div>
                    </template>
                    <span>{{ shape.name }}</span>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Rectangle from './shapes/Rectangle.vue';
import RoundedRectangle from './shapes/RoundedRectangle.vue';
import Circle from './shapes/Circle.vue';
import Triangle from './shapes/Triangle.vue';
import Rhombus from './shapes/Rhombus.vue';
import Parallelogram from './shapes/Parallelogram.vue';
import Process from './shapes/Process.vue';
import FlexibleLines from './shapes/FlexibleLines.vue';
import Arrow from './shapes/Arrow.vue';
import TwoWayArrow from './shapes/TwoWayArrow.vue';

const props = defineProps({
    isOpen: Boolean
});

const shapes = [
    { name: 'Rectangle', component: Rectangle, width: 25, height: 20 },
    { name: 'Rounded Rectangle', component: RoundedRectangle, width: 25, height: 20 },
    { name: 'Circle', component: Circle, width: 20, height: 20 },
    { name: 'Triangle', component: Triangle, width: 20, height: 20 },
    { name: 'Rhombus', component: Rhombus, width: 20, height: 20 },
    { name: 'Parallelogram', component: Parallelogram, width: 20, height: 20 },
    { name: 'Process', component: Process, width: 20, height: 20 },
    { name: 'Flexible Lines', component: FlexibleLines, width: 20 },
    { name: 'Arrow', component: Arrow, width: 20, height: 20 },
    { name: 'Two Way Arrow', component: TwoWayArrow, width: 16 }
];
</script>

<style scoped>
    .shape-list {
        @apply fixed bottom-20 left-5 bg-white rounded-lg shadow-lg z-50;
    }
    .shape-list-item {
        @apply flex items-center justify-center p-2 h-12 w-12
    }
    .shape-list-item:hover {
        @apply bg-theme-transparentBg cursor-pointer
    }
</style>
