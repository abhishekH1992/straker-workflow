<template>
    <v-app class="main">
        <HeaderNav
            @save="saveShapes"
            :hasShapesInLocalStorage="hasShapesInLocalStorage"
            @load="loadShapes"
        />
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
                    stroke-width="10"
                />
                <line
                    v-if="tempConnection"
                    :x1="tempConnection.x1"
                    :y1="tempConnection.y1"
                    :x2="tempConnection.x2"
                    :y2="tempConnection.y2"
                    stroke="red"
                    stroke-width="10"
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
            <ShapeIcon v-else :icon="shape.icon" :size="shape.size" />
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useShapes } from '~/composables/useShapes';
import HeaderNav from '~/components/HeaderNav.vue';
import FloatingActionButton from '~/components/FloatingActionButton.vue';
import ShapeList from '~/components/ShapeList.vue';
import ShapeIcon from '~/components/ShapeIcon.vue';
import ShapeSettingsCard from '~/components/ShapeSettingsCard.vue';

const isOpen = ref(false);
const { shapes, connections, tempConnection, addShape, updateShape, deleteShape, startConnection, updateTempConnection, finishConnection, saveToLocalStorage, loadFromLocalStorage } = useShapes();
const currentShapeIndex = ref(null);
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

const showSettings = (index, event) => {
    shapes.value.forEach((shape, i) => shape.showSettings = i === index ? !shape.showSettings : false);
};

const updateShapeHandler = (index, updatedShape) => {
    if(updatedShape.width > 0) {
        const size = updatedShape.width;
        updateShape(index, { ...updatedShape, size });
    }
};
  
const deleteShapeHandler = (index) => {
    deleteShape(index);
};
  
const startDrag = (event, index) => {
    event.preventDefault();
    const startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
    const startLeft = shapes.value[index].left;
    const startTop = shapes.value[index].top;

    const move = (moveEvent) => {
        moveEvent.preventDefault();
        const moveX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
        const moveY = moveEvent.type === 'mousemove' ? moveEvent.clientY : moveEvent.touches[0].clientY;
        const newLeft = startLeft + (moveX - startX);
        const newTop = startTop + (moveY - startY);
        updateShape(index, { left: newLeft, top: newTop });
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

const handleClickOutside = (event) => {
    const shapeContainers = document.querySelectorAll('.shape-container');
    const shapeCards = document.querySelectorAll('.shape-list-block');
    const isClickInsideShape = Array.from(shapeContainers).some(container => container.contains(event.target));
    const isClickInsideCard = Array.from(shapeCards).some(card => card.contains(event.target));

    if (!isClickInsideShape && !isClickInsideCard) {
        shapes.value.forEach(shape => shape.showSettings = false);
    }
};

const saveShapes = () => {
    saveToLocalStorage();
    checkLocalStorage();
};

const loadShapes = () => {
    loadFromLocalStorage();
    checkLocalStorage();
};

const checkLocalStorage = () => {
    if (process.client) {
        const savedShapes = localStorage.getItem('shapes');
        hasShapesInLocalStorage.value = savedShapes !== null;
    }
};

const editText = (shape) => {
    shape.isEditing = true;
};

const finishEditing = (shape) => {
    shape.isEditing = false;
};

const finishEditingDelayed = (shape) => {
    setTimeout(() => finishEditing(shape), 200);
};

const handleDoubleClick = (event, shape) => {
    event.preventDefault();
    event.stopPropagation();
  
    const x = shape.left + shape.width / 2;
    const y = shape.top + shape.height / 2;

    if (!tempConnection.value) {
        startConnection(x, y, shape.id);
    } else {
        finishConnection(shape.id);
    }
};

const handleMouseMove = (event) => {
    if (tempConnection.value) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        updateTempConnection(x, y);
    }
};

const getConnectionPoint = (shapeId) => {
    const shape = shapes.value.find(s => s.id === shapeId);
    if (shape) {
        return {
            x: shape.left + shape.width / 2,
            y: shape.top + shape.height / 2
        };
    }
    return { x: 0, y: 0 };
};
  
onMounted(() => {
    nextTick(() => {
        checkLocalStorage();
        loadFromLocalStorage();
        updateContainerSize();
    });
  document.addEventListener('click', handleClickOutside);
    if (process.client) {
        window.addEventListener('resize', updateContainerSize);
    }
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    if (process.client) {
        window.removeEventListener('resize', updateContainerSize);
    }
});
</script>

<style scoped>
    .main {
        @apply bg-gray-200;
    }
    .shape-container {
        @apply p-2 absolute;
    }
    .v-card-text {
        @apply flex p-0;
    }
    .connection-lines {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 1;
    }
</style>