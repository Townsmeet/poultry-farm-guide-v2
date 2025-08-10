<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string;
    rel?: string;
    target?: string;
  }>(),
  {
    href: "",
    rel: "noopener noreferrer",
    target: "_blank",
  },
);
</script>

<template>
  <a
    :href="props.href"
    :rel="props.rel || 'noopener noreferrer'"
    :target="props.target || '_blank'"
    class="text-primary-600 underline underline-offset-4 decoration-primary-400 hover:text-primary-700 hover:decoration-2 dark:text-primary-400 dark:hover:text-primary-300"
  >
    <slot />
  </a>
</template>
