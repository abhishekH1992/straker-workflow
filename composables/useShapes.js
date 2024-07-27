import { ref } from 'vue';

export function useShapes() {
    const shapes = ref([]);

    const addShape = (shape) => {
        console.log(shape);
        if(shape.icon !== 'mdiTextRecognition') {
            shapes.value.push({
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
            shapes.value.splice(index, 1);
            saveShapesToLocalStorage();
        }
    };

    const toggleSettings = (index) => {
        shapes.value.forEach((shape, i) => {
            shape.showSettings = i === index ? !shape.showSettings : false;
        });
    };

    const saveShapesToLocalStorage = () => {
        if (process.client && shapes.value.length) {
            localStorage.setItem('shapes', JSON.stringify(shapes.value));
        }
    };

    const loadShapesFromLocalStorage = () => {
        if (process.client) {
            const savedShapes = localStorage.getItem('shapes');
            if (savedShapes) {
                shapes.value = JSON.parse(savedShapes);
            }
        }
    };

    return {
        shapes,
        addShape,
        updateShape,
        deleteShape,
        toggleSettings,
        saveShapesToLocalStorage,
        loadShapesFromLocalStorage
    };
}
