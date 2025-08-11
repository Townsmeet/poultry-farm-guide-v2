<script setup>
defineProps({
  post: { type: Object, required: true },
});

// Helpers local to the component
const coverOf = (post) => post?.meta.coverImage || null;
const formatDate = (d) => {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};
</script>

<template>
  <UCard class="group relative overflow-hidden">
    <template #header>
      <NuxtLink :to="post.path || post._path" class="block">
        <div class="relative overflow-hidden rounded-lg">
          <div
            class="relative aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800"
          >
            <NuxtImg
              v-if="coverOf(post)"
              :src="coverOf(post)"
              :alt="post.title"
              fill
              class="object-cover transition duration-200 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 768px"
              :preload="false"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600"
            >
              <UIcon name="i-heroicons-photo" class="h-10 w-10" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </template>

    <div class="flex flex-col gap-2">
      <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          variant="soft"
          color="info"
          class="text-[10px] font-medium"
        >
          {{ tag }}
        </UBadge>
      </div>
      <NuxtLink :to="post.path || post._path" class="block">
        <h3
          class="text-lg font-semibold text-gray-900 underline-offset-4 group-hover:underline dark:text-white"
        >
          {{ post.title }}
        </h3>
      </NuxtLink>
      <div
        class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400"
      >
        <span v-if="post.meta.publishedAt">{{
          formatDate(post.meta.publishedAt)
        }}</span>
        <span v-if="post.readingTime">• {{ post.readingTime.text }}</span>
      </div>
      <p class="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
        {{ post.description || post.excerpt }}
      </p>
      <div class="mt-3">
        <UButton
          :to="post.path || post._path"
          size="sm"
          color="primary"
          variant="soft"
          icon="i-heroicons-arrow-right"
          >Read</UButton
        >
      </div>
    </div>
  </UCard>
</template>
