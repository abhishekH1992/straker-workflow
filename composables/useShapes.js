import { ref } from 'vue';

export function useShapes() {
    const shapes = ref([]);

    const addShape = (shape) => {
        shapes.value.push({
            ...shape,
            showSettings: false,
            top: 100,
            left: 100,
            width: 150,
            height: 150,
            size: 150,
        });
    };

    const updateShape = (index, newAttributes) => {
        Object.assign(shapes.value[index], newAttributes);
    };

    const deleteShape = (index) => {
        shapes.value.splice(index, 1);
    };

    const toggleSettings = (index) => {
        shapes.value.forEach((shape, i) => {
        shape.showSettings = i === index ? !shape.showSettings : false;
        });
    };

    return {
        shapes,
        addShape,
        updateShape,
        deleteShape,
        toggleSettings,
    };
}
