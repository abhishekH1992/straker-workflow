<template>
    <div v-if="isOpen" class="shape-list" elevation="4">
        <div class="text-gray-500 p-4 pb-2 text-sm">Shapes</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-5 xl:grid-cols-4 gap-4 p-4">
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
        <div class="grid grid-cols-5 xl:grid-cols-4 gap-4 p-4">
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
        <div class="text-gray-500 p-4 pb-2 text-sm">Typography</div>
        <v-divider :thickness="2"></v-divider>
        <div class="grid grid-cols-5 xl:grid-cols-4 gap-4 p-4">
            <div v-for="(typo, index) in typography" :key="index" class="shape-list-item">
                <v-tooltip bottom :text="typo.name">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on" icon class="shape-btn" @click="selectShape(typo)">
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

const lines = [
    { name: 'Line', icon: 'mdiMinus', size: 30 },
    { name: 'Vector Line', icon: 'mdiVectorLine', size: 30 },
    { name: 'Arrow Up', icon: 'mdiArrowUp', size: 30 },
    { name: 'Arrow Right', icon: 'mdiArrowRight', size: 30 },
    { name: 'Arrow Bottpm', icon: 'mdiArrowDown', size: 30 },
    { name: 'Arrow Left', icon: 'mdiArrowLeft', size: 30 },
    { name: 'Two Directional Arrow', icon: 'mdiArrowLeftRightBoldOutline', size: 30 },
];

const typography = [
{ name: 'Text', icon: 'mdiTextRecognition', size: 30 },
]

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
