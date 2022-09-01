<template>
    <div class="modal show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="btn-close" @click="$emit('hidePopup')"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="$emit('hidePopup')">Close</button>
                    <button type="button" class="btn btn-primary" @click="$emit('saveData')">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
    title: String,
});

const emit = defineEmits(['saveData', 'hidePopup']) 

</script>
<style scoped>
.modal{
    background: rgba(0,0,0,0.7);
}
</style>