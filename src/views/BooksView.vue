<script setup>
import Books from "@/components/Books.vue";
import { Suspense } from "vue";
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <Books />
      </template>
      <template #fallback>
        <div class="d-flex justify-content-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
    </Suspense>
  </main>
</template>
