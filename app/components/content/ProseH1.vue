<template>
  <h1
    v-bind="$attrs"
    class="group mt-6 scroll-mt-24 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
  >
    <slot />
    <a
      v-if="$attrs.id"
      :href="`#${$attrs.id}`"
      aria-label="Link to heading"
      class="ml-2 inline-flex opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100"
    >
      <UIcon
        name="i-heroicons-link-16-solid"
        class="h-4 w-4 text-gray-500 dark:text-gray-400"
      />
    </a>
  </h1>
</template>
