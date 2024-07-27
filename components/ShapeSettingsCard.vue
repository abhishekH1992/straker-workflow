<!-- components/ShapeSettingsCard.vue -->
<template>
    <v-card class="shape-list-block" @click.stop>
        <v-card-text>
            <div class="shape-list-block-item">
                <v-text-field
                    v-model="localShape.width"
                    label="Width"
                    type="number"
                    @change="emitUpdate"
                />
            </div>
            <div class="shape-list-block-item">
                <v-text-field
                    v-model="localShape.height"
                    label="Height"
                    type="number"
                    @change="emitUpdate"
                />
            </div>
            <div class="shape-list-block-item">
                <v-btn icon @click="emitDelete">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    shape: Object,
    index: Number
});

const emit = defineEmits(['updateShape', 'deleteShape']);

const localShape = computed(() => ({ ...props.shape }));

const emitUpdate = () => {
    emit('updateShape', props.index, localShape.value);
};

const emitDelete = () => {
    emit('deleteShape', props.index);
};
</script>

<style scoped>
.shape-list-block {
    @apply fixed bg-white rounded-lg shadow-lg z-50;
}
.shape-list-block-item {
    @apply flex items-center justify-center p-2;
}

.v-card-text {
    @apply flex p-0;
}
</style>
