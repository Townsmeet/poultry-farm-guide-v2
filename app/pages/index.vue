<template>
  <UContainer class="py-16 sm:py-24">
    <!-- Hero -->
    <section
      class="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/60 p-8 shadow-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/40 sm:p-12"
    >
      <div aria-hidden class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-tr from-primary-400/20 via-primary-500/10 to-transparent blur-2xl"
        />
        <div
          class="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-400/10 to-transparent blur-2xl"
        />
      </div>
      <div class="mx-auto max-w-3xl text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-primary-400/20 dark:bg-primary-900/30 dark:text-primary-300"
        >
          <UIcon name="i-heroicons-sparkles" class="h-4 w-4" />
          Practical, field-tested knowledge
        </span>
        <h1
          class="mt-6 bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-4xl font-black tracking-tight text-transparent dark:from-white dark:to-gray-300 sm:text-5xl md:text-6xl"
        >
          Raise a thriving poultry farm with confidence
        </h1>
        <p
          class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
        >
          Clear, actionable guides and tools to help you care for your flock,
          optimize operations, and grow sustainably.
        </p>
        <div
          class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <UButton
            to="/blog"
            size="lg"
            color="primary"
            variant="solid"
            icon="i-heroicons-book-open"
            class="px-6 py-3"
            >Explore our Blog</UButton
          >
          <UButton
            href="https://www.youtube.com/@PoultryfarmGuide"
            size="lg"
            color="red"
            variant="soft"
            icon="i-simple-icons-youtube"
            target="_blank"
            rel="noopener"
            class="px-6 py-3"
            >Watch on YouTube</UButton
          >
        </div>
      </div>

      <!-- Stats -->
      <div
        class="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 rounded-xl bg-white/60 p-4 ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/40 dark:ring-gray-800 sm:grid-cols-4"
      >
        <div v-for="(s, i) in stats" :key="i" class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ s.value }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ s.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section id="latest-posts" class="mt-16 sm:mt-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2
          class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl"
        >
          Latest posts
        </h2>
        <p class="mt-3 text-gray-600 dark:text-gray-300">
          Fresh guides and insights from our blog.
        </p>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Debug: show count of latest posts returned -->
        <PostCard v-for="post in displayPosts" :key="post.path" :post="post" />
      </div>
      <div class="mt-8 text-center">
        <UButton
          to="/blog"
          icon="i-heroicons-book-open"
          variant="ghost"
          color="gray"
          >Browse all posts</UButton
        >
      </div>
    </section>
  </UContainer>
</template>

<script setup>
useHead({
  title: "Poultry Farm Guide - Home",
  meta: [
    {
      name: "description",
      content: "Your comprehensive guide to poultry farming and chicken care",
    },
    { property: "og:title", content: "Poultry Farm Guide - Home" },
    {
      property: "og:description",
      content:
        "Actionable guides and tools for raising healthy, productive chickens.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});

const stats = [
  { value: "120+", label: "In-depth articles" },
  { value: "35K", label: "Monthly readers" },
  { value: "98%", label: "Reader satisfaction" },
  { value: "24/7", label: "Access anywhere" },
];

const {
  data: posts,
  error: postsError,
  status: postsStatus,
} = await useAsyncData("latest-posts", async () => {
  // Fetch all, sort and slice on the client to avoid SQL order syntax issues
  return await queryCollection("blog").all();
});

// Debug: log count and paths when data updates (client only)
if (import.meta.client) {
  watchEffect(() => {
    console.log(
      "debug: latest posts count",
      posts.value?.length,
      posts.value?.map((p) => p?.path),
      "status",
      postsStatus.value,
      "error",
      postsError?.value,
    );
  });
  (async () => {
    try {
      const all = await queryCollection("blog").all();

      console.log(
        "debug: all content count (blog collection)",
        all?.length,
        all?.map((d) => d?.path),
      );
    } catch (e) {
      console.log("debug: queryCollection() failed", e);
    }
  })();
}

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
  const withRT = list.map((p) => {
    if (!p?.readingTime && p?.body) {
      const rt = estimateReadingTimeFromBody(p.body);
      if (rt) p.readingTime = rt;
    }
    return p;
  });
  const toTime = (d) => {
    try {
      return d ? new Date(d).getTime() : 0;
    } catch {
      return 0;
    }
  };
  return withRT
    .sort(
      (a, b) =>
        toTime(b.publishedAt || b.date) - toTime(a.publishedAt || a.date),
    )
    .slice(0, 6);
});
</script>
