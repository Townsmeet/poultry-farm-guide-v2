<script setup>
// Fetch all blog posts (Nuxt Content v3)
const { data: posts } = await useAsyncData("blog-posts", async () => {
  return await queryCollection("blog").all();
});

useHead({
  title: "Blog - Poultry Farm Guide",
  meta: [
    {
      name: "description",
      content: "Latest articles and guides about poultry farming",
    },
  ],
});

function estimateReadingTimeFromBody(body) {
  try {
    const text = typeof body === "string" ? body : JSON.stringify(body);
    const words = (text.match(/\w+/g) || []).length;
    const wordsPerMinute = 200;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return { text: `${minutes} min read`, minutes, words };
  } catch {
    return undefined;
  }
}

const displayPosts = computed(() => {
  const list = posts?.value ?? [];
  return list.map((p) => {
    if (!p?.readingTime && p?.body) {
      const rt = estimateReadingTimeFromBody(p.body);
      if (rt) p.readingTime = rt;
    }
    return p;
  });
});
const search = ref("");
const filteredPosts = computed(() => {
  const q = search.value?.toLowerCase().trim();
  const list = displayPosts.value || [];
  if (!q) return list;
  return list.filter((p) => {
    const hay = [
      p.title,
      p.description,
      p.excerpt,
      Array.isArray(p.tags) ? p.tags.join(" ") : "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
});

// Pagination
const page = ref(1);
const pageSize = 9; // items per page
const totalPages = computed(() =>
  Math.max(1, Math.ceil((filteredPosts.value?.length || 0) / pageSize)),
);
const paginatedPosts = computed(() => {
  const start = (page.value - 1) * pageSize;
  return (filteredPosts.value || []).slice(start, start + pageSize);
});

// Reset to first page when filter results change
watch(filteredPosts, () => {
  page.value = 1;
});
</script>

<template>
  <UContainer class="py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
        >
          Blog
        </h1>
        <p class="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-2xl">
          Latest articles and guides about raising healthy and happy poultry.
        </p>
      </div>
      <div>
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search posts..."
          color="gray"
          variant="outline"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          autocomplete="off"
        />
      </div>
    </div>

    <div v-if="filteredPosts && filteredPosts.length > 0">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <PostCard
          v-for="post in paginatedPosts"
          :key="post.path || post._path"
          :post="post"
        />
      </div>

      <!-- Pagination controls -->
      <div v-if="totalPages > 1" class="mt-8 flex items-center justify-between">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-chevron-left"
          :disabled="page <= 1"
          @click="page = Math.max(1, page - 1)"
        >
          Previous
        </UButton>

        <p class="text-sm text-gray-600 dark:text-gray-400">
          Page {{ page }} of {{ totalPages }}
        </p>

        <UButton
          color="gray"
          variant="ghost"
          trailing-icon="i-heroicons-chevron-right"
          :disabled="page >= totalPages"
          @click="page = Math.min(totalPages, page + 1)"
        >
          Next
        </UButton>
      </div>
    </div>

    <div v-else class="text-center py-16">
      <div
        class="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
      >
        <UIcon name="i-heroicons-document-text" class="h-8 w-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
        No matching articles
      </h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Try a different search term.
      </p>
      <div class="mt-4">
        <UButton to="/" color="gray" variant="ghost"> Back to Home </UButton>
      </div>
    </div>
  </UContainer>
</template>
