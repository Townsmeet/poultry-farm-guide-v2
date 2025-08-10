<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    title?: string;
  }>(),
  {
    src: "",
    alt: "",
    title: "",
  },
);
</script>

<template>
  <figure class="my-6">
    <img
      :src="props.src"
      :alt="props.alt"
      class="w-full rounded-lg shadow-sm object-cover"
    />
    <figcaption
      v-if="props.title"
      class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      {{ props.title }}
    </figcaption>
  </figure>
</template>
