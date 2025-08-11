<template>
  <UApp>
    <!-- Header -->
    <header
      class="sticky top-0 z-40 border-b border-gray-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800/70 dark:bg-gray-900/60"
    >
      <UContainer class="flex h-14 items-center justify-between gap-3">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-semibold text-gray-900 hover:opacity-90 dark:text-white"
        >
          <NuxtImg
            src="/images/logo.jpg"
            alt="logo"
            width="20"
            height="20"
            class="rounded"
            preload
          />
          <span>Poultry Farm Guide</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-1 md:flex">
          <UButton
            to="/"
            color="gray"
            variant="ghost"
            icon="i-heroicons-home"
            label="Home"
          />
          <UButton
            to="/blog"
            color="gray"
            variant="ghost"
            icon="i-heroicons-book-open"
            label="Blog"
          />
          <UButton
            href="https://www.youtube.com/@PoultryfarmGuide"
            color="red"
            variant="ghost"
            icon="i-simple-icons-youtube"
            label="YouTube"
            target="_blank"
            rel="noopener"
          />
          <!-- Desktop color mode toggle inside nav -->
          <ClientOnly v-if="!colorMode?.forced">
            <UButton
              :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              color="gray"
              variant="ghost"
              aria-label="Toggle color mode"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="h-8 w-8" />
            </template>
          </ClientOnly>
        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden relative">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-bars-3"
            aria-label="Open menu"
            @click="isMenuOpen = !isMenuOpen"
          />
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <NuxtLink
              to="/"
              class="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="isMenuOpen = false"
            >
              <UIcon name="i-heroicons-home" class="h-4 w-4" />
              <span>Home</span>
            </NuxtLink>
            <NuxtLink
              to="/blog"
              class="mt-1 flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="isMenuOpen = false"
            >
              <UIcon name="i-heroicons-book-open" class="h-4 w-4" />
              <span>Blog</span>
            </NuxtLink>
            <a
              href="https://www.youtube.com/@PoultryfarmGuide"
              target="_blank"
              rel="noopener"
              class="mt-1 flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="isMenuOpen = false"
            >
              <UIcon name="i-simple-icons-youtube" class="h-4 w-4" />
              <span>YouTube</span>
            </a>
            <div
              class="mt-1 flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ClientOnly v-if="!colorMode?.forced">
                <UButton
                  :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
                  color="gray"
                  variant="ghost"
                  class="w-full justify-start"
                  label="Toggle theme"
                  @click="isDark = !isDark"
                />
                <template #fallback>
                  <div class="h-8 w-8" />
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </UContainer>
    </header>

    <!-- Page content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Footer -->
    <footer class="mt-16 border-t border-gray-200/70 dark:border-gray-800/70">
      <UContainer class="py-8">
        <div
          class="flex flex-col justify-center gap-4 text-center text-sm text-gray-600 dark:text-gray-400 sm:text-left sm:gap-3"
        >
          <div
            class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between"
          >
            <p>© {{ year }} Poultry Farm Guide. All rights reserved.</p>
            <div
              class="flex flex-wrap items-center justify-center gap-4 sm:justify-end"
            >
              <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white"
                >Home</NuxtLink
              >
              <NuxtLink
                to="/blog"
                class="hover:text-gray-900 dark:hover:text-white"
                >Blog</NuxtLink
              >
              <a
                href="https://www.youtube.com/@PoultryfarmGuide"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
              >
                <UIcon
                  name="i-simple-icons-youtube"
                  class="h-4 w-4 text-red-500"
                />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>

<script setup>
const year = new Date().getFullYear();
const isMenuOpen = ref(false);
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);

// Color mode (from @nuxt/ui integration)
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(v) {
    colorMode.preference = v ? "dark" : "light";
  },
});
</script>
