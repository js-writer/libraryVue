<script setup>
import Borrows from "@/components/Borrows.vue";
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <Borrows />
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
