<template>
    <v-app-bar class="header" app>
        <v-app-bar-title>Straker WorkFlow</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="$emit('save')">Save</v-btn>
        <v-btn class="mr-4" :disabled="!hasShapesInLocalStorage" @click="$emit('load')">Load</v-btn>
    </v-app-bar>
</template>

<script setup>
import { defineProps } from 'vue';
 
const props = defineProps({
    hasShapesInLocalStorage: Boolean
});
</script>