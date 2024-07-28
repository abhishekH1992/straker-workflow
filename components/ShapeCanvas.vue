<template>
    <v-container class="relative" @mousemove="handleMouseMove">
        <svg class="connection-lines" :width="containerWidth" :height="containerHeight">
            <line
                v-for="(connection, index) in connections"
                :key="index"
                :x1="getConnectionPoint(connection.fromId).x"
                :y1="getConnectionPoint(connection.fromId).y"
                :x2="getConnectionPoint(connection.toId).x"
                :y2="getConnectionPoint(connection.toId).y"
                stroke="black"
                stroke-width="1"
            />
            <line
                v-if="tempConnection"
                :x1="tempConnection.x1"
                :y1="tempConnection.y1"
                :x2="tempConnection.x2"
                :y2="tempConnection.y2"
                stroke="black"
                stroke-width="1"
            />
        </svg>
        <div
            v-for="(shape, index) in shapes"
            :key="index"
            class="shape-container cursor-grab"
            :style="{ top: shape.top + 'px', left: shape.left + 'px', width: shape.width + 'px', height: shape.height + 'px', position: 'absolute' }"
            @mousedown.stop="startDrag($event, index)"
            @touchstart.stop="startDrag($event, index)"
            @click.stop="showSettings(index, $event)"
            @dblclick.stop="handleDoubleClick($event, shape)"
        >
            <template v-if="shape.icon === 'mdiTextRecognition'">
                <textarea
                    v-if="shape.isEditing"
                    v-model="shape.text"
                    @blur="finishEditingDelayed(shape)"
                    class="b-1 border-theme-brand"
                    :style="{ width: shape.width + 'px', height: shape.height + 'px' }"
                >Type Here...</textarea>
                <div v-else @click="editText(shape)">{{ shape.text || 'Type Here...' }}</div>
            </template>
            <component
                v-else
                :is="getShapeComponent(shape)"
                :width="shape.width"
                :height="shape.height"
            />
            <ShapeSettingsCard
                v-if="shape.showSettings"
                :shape="shape"
                :index="index"
                @updateShape="updateShapeHandler"
                @deleteShape="deleteShapeHandler"
            />
        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue';
import ShapeSettingsCard from './ShapeSettingsCard.vue';
import Rectangle from './shapes/Rectangle.vue';
import Circle from './shapes/Circle.vue';
import Triangle from './shapes/Triangle.vue';
import Rhombus from './shapes/Rhombus.vue';
import Parallelogram from './shapes/Parallelogram.vue';
import Process from './shapes/Process.vue';
import RoundedRectangle from './shapes/RoundedRectangle.vue';

const props = defineProps({
    shapes: Array,
    connections: Array,
    tempConnection: Object,
    containerWidth: Number,
    containerHeight: Number,
});

const emit = defineEmits([
    'updateShape', 
    'deleteShape', 
    'startConnection', 
    'updateTempConnection', 
    'finishConnection'
]);

const getShapeComponent = (shape) => {
    switch(shape.component) {
        case 'Rectangle': return Rectangle;
        case 'Circle': return Circle;
        case 'Triangle': return Triangle;
        case 'Rhombus': return Rhombus;
        case 'Parallelogram': return Parallelogram;
        case 'Process': return Process;
        case 'RoundedRectangle': return RoundedRectangle;
        default: return Rectangle; // Default to Rectangle if unknown
    }
};

const startDrag = (event, index) => {
    event.preventDefault();
    const startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
    const startLeft = props.shapes[index].left;
    const startTop = props.shapes[index].top;

    const move = (moveEvent) => {
        moveEvent.preventDefault();
        const moveX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
        const moveY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;
        const newLeft = startLeft + (moveX - startX);
        const newTop = startTop + (moveY - startY);
        emit('updateShape', index, { left: newLeft, top: newTop });
    };

    const stopDrag = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', stopDrag);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', stopDrag);
};

const showSettings = (index, event) => {
    props.shapes.forEach((shape, i) => {
        if (i === index) {
            emit('updateShape', i, { showSettings: !shape.showSettings });
        } else if (shape.showSettings) {
            emit('updateShape', i, { showSettings: false });
        }
    });
};

const updateShapeHandler = (index, updatedShape) => {
    emit('updateShape', index, updatedShape);
};

const deleteShapeHandler = (index) => {
    emit('deleteShape', index);
};

const editText = (shape) => {
    emit('updateShape', props.shapes.indexOf(shape), { isEditing: true });
};

const finishEditingDelayed = (shape) => {
    setTimeout(() => {
        emit('updateShape', props.shapes.indexOf(shape), { isEditing: false });
    }, 200);
};

const handleDoubleClick = (event, shape) => {
    event.preventDefault();
    event.stopPropagation();

    const x = shape.left + shape.width / 2;
    const y = shape.top + shape.height / 2;

    if (!props.tempConnection) {
        emit('startConnection', x, y, shape.id);
    } else {
        emit('finishConnection', shape.id);
    }
};

const handleMouseMove = (event) => {
    if (props.tempConnection) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        emit('updateTempConnection', x, y);
    }
};

const getConnectionPoint = (shapeId) => {
    const shape = props.shapes.find(s => s.id === shapeId);
    if (shape) {
        return {
            x: shape.left + shape.width / 2,
            y: shape.top + shape.height / 2
        };
    }
    return { x: 0, y: 0 };
};

// Add this watch effect to log when shapes change
watch(() => props.shapes, (newShapes) => {
  console.log('Shapes in ShapeCanvas updated:', newShapes);
}, { deep: true });
</script>

<style scoped>
.shape-container {
    @apply p-2 absolute;
}
.connection-lines {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
}
</style>