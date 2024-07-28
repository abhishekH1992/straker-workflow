<template>
    <v-card class="shape-list-block" @click.stop>
        <v-card-text>
            <div class="shape-list-block-item">
                <v-icon class="coursor-pointer" @click="emitDelete">mdi-close</v-icon>
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

const emit = defineEmits(['deleteShape']);

const localShape = computed(() => ({ ...props.shape }));

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
