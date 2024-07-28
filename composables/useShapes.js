import { ref, computed } from 'vue';

export function useShapes() {
    const shapes = ref([]);
    const connections = ref([]);
    const tempConnection = ref(null);

    const addShape = (shape) => {
        if(shape.icon !== 'mdiTextRecognition') {
            shapes.value.push({
                id: Date.now(),
                ...shape,
                showSettings: false,
                isEditing: false,
                text: '',
                top: 100,
                left: 100,
                width: 150,
                height: 150,
                size: 150,
            });
        } else {
            shapes.value.push({
                id: Date.now(),
                ...shape,
                showSettings: false,
                isEditing: false,
                text: 'Write here...',
                top: 100,
                left: 100,
            });
        }
    };

    const updateShape = (index, newAttributes) => {
        if (shapes.value[index]) {
            Object.assign(shapes.value[index], newAttributes);
        }
    };

    const deleteShape = (index) => {
        if (shapes.value[index]) {
            const shapeId = shapes.value[index].id;
            shapes.value.splice(index, 1);
            // Remove all connections associated with this shape
            connections.value = connections.value.filter(conn => conn.fromId !== shapeId && conn.toId !== shapeId);
        }
    };

    const toggleSettings = (index) => {
        shapes.value.forEach((shape, i) => {
            shape.showSettings = i === index ? !shape.showSettings : false;
        });
    };

    const startConnection = (x, y, shapeId) => {
        tempConnection.value = { x1: x, y1: y, x2: x, y2: y, fromId: shapeId };
    };

    const updateTempConnection = (x, y) => {
        if (tempConnection.value) {
            tempConnection.value.x2 = x;
            tempConnection.value.y2 = y;
        }
    };

    const finishConnection = (toShapeId) => {
        if (tempConnection.value && tempConnection.value.fromId !== toShapeId) {
            connections.value.push({
                id: Date.now(),
                fromId: tempConnection.value.fromId,
                toId: toShapeId
            });
            tempConnection.value = null;
        } else {
            tempConnection.value = null;
        }
    };

    const saveToLocalStorage = () => {
        if (process.client) {
            localStorage.setItem('shapes', JSON.stringify(shapes.value));
            localStorage.setItem('connections', JSON.stringify(connections.value));
        }
    };

    const loadFromLocalStorage = () => {
        if (process.client) {
            const savedShapes = localStorage.getItem('shapes');
            const savedConnections = localStorage.getItem('connections');
            if (savedShapes) {
                shapes.value = JSON.parse(savedShapes);
            }
            if (savedConnections) {
                connections.value = JSON.parse(savedConnections);
            }
        }
    };

    return {
        shapes,
        connections,
        tempConnection,
        addShape,
        updateShape,
        deleteShape,
        toggleSettings,
        startConnection,
        updateTempConnection,
        finishConnection,
        saveToLocalStorage,
        loadFromLocalStorage
    };
}