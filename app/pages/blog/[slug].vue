<script setup>
const route = useRoute();
const { data: posts } = await useAsyncData("blog-all-for-detail", () => {
  return queryCollection("blog").all();
});
const post = computed(() => {
  const list = posts.value || [];
  return list.find((p) => p.path === `/blog/${route.params.slug}`) || null;
});

// Reactive page metadata
useHead(() => ({
  title: post.value?.title || "Blog Post",
  meta: [
    {
      name: "description",
      content: post.value?.description || "Poultry farming article",
    },
  ],
}));
</script>

<template>
  <UContainer class="py-8 px-4 sm:px-6 lg:px-8">
    <UButton
      to="/blog"
      color="gray"
      variant="ghost"
      icon="i-heroicons-arrow-left"
      label="Back to Blog"
      class="mb-6"
    />

    <article class="max-w-3xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <div
          v-if="post?.meta.tags?.length"
          class="flex flex-wrap items-center gap-2 mb-3"
        >
          <UBadge
            v-for="tag in post?.meta.tags"
            :key="tag"
            variant="soft"
            color="info"
          >
            {{ tag }}
          </UBadge>
        </div>

        <h1
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
        >
          {{ post?.title }}
        </h1>

        <div
          class="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
        >
          <time :datetime="post?.meta.publishedAt">
            {{
              new Date(post?.meta.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
          <span v-if="post?.readingTime?.text"
            >• {{ post.readingTime.text }}</span
          >
        </div>

        <NuxtImg
          v-if="post?.meta?.coverImage"
          :src="post.meta.coverImage"
          :alt="post?.title || post?.meta?.title || 'Post cover'"
          class="mt-6 rounded-lg object-cover w-full max-h-96"
        />
      </header>

      <!-- Body -->
      <div class="prose dark:prose-invert max-w-none">
        <ContentProse v-if="post" :value="post" />
      </div>

      <!-- Footer -->
      <footer class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <UButton
          to="/blog"
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          label="Back to Blog"
        />
      </footer>
    </article>
  </UContainer>
</template>
