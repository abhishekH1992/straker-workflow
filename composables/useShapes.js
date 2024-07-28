import { ref } from 'vue';

export function useShapes() {
    const shapes = ref([]);
    const connections = ref([]);
    const tempConnection = ref(null);

    const addShape = (shapeInfo) => {
        const newShape = {
            id: Date.now(),
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            component: shapeInfo.name,
            name: shapeInfo.name,
            icon: shapeInfo.icon,
            showSettings: false,
            isEditing: false,
            text: ''
        };
        shapes.value.push(newShape);
    };

    const updateShape = (index, updatedProps) => {
        shapes.value[index] = { ...shapes.value[index], ...updatedProps };
    };

    const deleteShape = (index) => {
        shapes.value.splice(index, 1);
    };

    const startConnection = (x, y, fromId) => {
        tempConnection.value = { x1: x, y1: y, x2: x, y2: y, fromId };
    };

    const updateTempConnection = (x, y) => {
        if (tempConnection.value) {
            tempConnection.value = { ...tempConnection.value, x2: x, y2: y };
        }
    };

    const finishConnection = (toId) => {
        if (tempConnection.value && tempConnection.value.fromId !== toId) {
            connections.value.push({
                fromId: tempConnection.value.fromId,
                toId: toId
            });
        }
        tempConnection.value = null;
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
                const parsedShapes = JSON.parse(savedShapes);
                console.log('Loaded shapes:', parsedShapes);
                const shapesWithComponents = parsedShapes.map(shape => {
                    console.log('Processing shape:', shape);
                    if (!shape.component) {
                        shape.component = getComponentForShape(shape);
                    }
                    return shape;
                });

                shapes.value = shapesWithComponents;
                console.log('Shapes after processing:', shapes.value);
            }
            if (savedConnections) {
                connections.value = JSON.parse(savedConnections);
            }
        }
    };
    const getComponentForShape = (shape) => {
        console.log('Getting component for shape:', shape);
        if (shape.component) {
            return shape.component;
        }
        switch(shape.name) {
            case 'Rectangle':
                return 'Rectangle';
            case 'Circle':
                return 'Circle';
            case 'Triangle':
                return 'Triangle';
            case 'Rhombus':
                return 'Rhombus';
            case 'Parallelogram':
                return 'Parallelogram';
            case 'Process':
                return 'Process';
            case 'Rounded Rectangle':
                return 'RoundedRectangle';
            default:
                return 'Rectangle';
        }
    };

    return {
        shapes,
        connections,
        tempConnection,
        addShape,
        updateShape,
        deleteShape,
        startConnection,
        updateTempConnection,
        finishConnection,
        saveToLocalStorage,
        loadFromLocalStorage
    };
}