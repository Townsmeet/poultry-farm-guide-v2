<template>
  <div
    class="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800"
  >
    <table
      class="min-w-full divide-y divide-gray-200 dark:divide-gray-800 [&_th]:px-4 [&_th]:py-2 [&_td]:px-4 [&_td]:py-2 [&_th:first-child]:pl-5 [&_td:first-child]:pl-5"
    >
      <slot />
    </table>
  </div>
</template>
