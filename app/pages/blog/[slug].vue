<script setup>
import ContentProse from "~/components/ContentProse.vue";
import ProseH2 from "~/components/content/ProseH2.vue";
import ProseH3 from "~/components/content/ProseH3.vue";
import ProseH4 from "~/components/content/ProseH4.vue";
import ProseH5 from "~/components/content/ProseH5.vue";
import ProseH6 from "~/components/content/ProseH6.vue";
import ProseImg from "~/components/content/ProseImg.vue";
import ProseBlockquote from "~/components/content/ProseBlockquote.vue";
import ProseA from "~/components/content/ProseA.vue";
import ProseTable from "~/components/content/ProseTable.vue";

const route = useRoute();
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () => {
  return queryContent("/blog")
    .where({ _path: `/blog/${route.params.slug}` })
    .findOne();
});

// Demo fallback when content is missing
const demoPost = {
  title: "Raising Healthy Backyard Chickens: A Practical Guide",
  description:
    "Learn the essentials of housing, feeding, and caring for your backyard flock.",
  publishedAt: "2025-07-25",
  coverImage: "/images/demo-image1.jpg",
  readingTime: { text: "6 min read" },
  tags: ["beginner", "care", "housing"],
};

const displayPost = computed(() => post.value || demoPost);

// Set page metadata
useHead({
  title: displayPost.value?.title || "Blog Post",
  meta: [
    {
      name: "description",
      content: displayPost.value?.description || "Poultry farming article",
    },
  ],
});
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
          v-if="displayPost.tags?.length"
          class="flex flex-wrap items-center gap-2 mb-3"
        >
          <UBadge
            v-for="tag in displayPost.tags"
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
          {{ displayPost.title }}
        </h1>

        <div
          class="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
        >
          <time :datetime="displayPost.publishedAt">
            {{
              new Date(displayPost.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
          <span v-if="displayPost.readingTime?.text"
            >• {{ displayPost.readingTime.text }}</span
          >
        </div>

        <img
          v-if="displayPost.coverImage"
          :src="displayPost.coverImage"
          :alt="displayPost.title"
          class="mt-6 rounded-lg object-cover w-full max-h-96"
        />
      </header>

      <!-- Body -->
      <div class="prose dark:prose-invert max-w-none">
        <ContentProse v-if="post" :value="post" />
        <template v-else>
          <p>
            Raising backyard chickens can be incredibly rewarding. This demo
            post showcases the full range of content types your articles can
            include: rich text, images, galleries, quotes, lists, tables, code
            blocks, and embedded videos.
          </p>

          <ProseH2>Getting started</ProseH2>
          <p>
            Begin by choosing a safe, well-ventilated coop with enough space per
            bird. A general rule is
            <strong>3–4 sq ft per chicken</strong> in the coop and at least
            <strong>8–10 sq ft</strong> in the run.
          </p>

          <ProseH3>Essential checklist</ProseH3>
          <ul>
            <li>Predator-proof coop and secure run</li>
            <li>Clean bedding (pine shavings or straw)</li>
            <li>Fresh water and balanced layer feed</li>
            <li>Nesting boxes (1 per 3–4 hens)</li>
            <li>Shade and dust bath area</li>
          </ul>

          <ProseH3>Featured image with caption</ProseH3>
          <ProseImg
            src="/images/demo-image1.jpg"
            alt="Healthy flock in the backyard"
            title="A happy flock enjoying a shaded run on a sunny day."
          />

          <ProseH2>Nutrition basics</ProseH2>
          <p>
            Provide a complete feed appropriate for the flock’s life stage.
            Supplement with greens, grit, and occasional treats. Avoid salty,
            moldy, or sugary scraps.
          </p>

          <ProseBlockquote>
            "Healthy nutrition is the foundation of a resilient, productive
            flock."
          </ProseBlockquote>

          <ProseH3>Feeding schedule</ProseH3>
          <ProseTable>
            <thead>
              <tr>
                <th>Age</th>
                <th>Feed Type</th>
                <th>Protein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0–8 weeks</td>
                <td>Starter</td>
                <td>18–20%</td>
              </tr>
              <tr>
                <td>8–16 weeks</td>
                <td>Grower</td>
                <td>16–18%</td>
              </tr>
              <tr>
                <td>16+ weeks</td>
                <td>Layer</td>
                <td>16%</td>
              </tr>
            </tbody>
          </ProseTable>

          <ProseH2>Image gallery</ProseH2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="/images/demo-image1.jpg"
              alt="Coop interior"
              class="rounded object-cover w-full h-56"
            />
            <img
              src="/images/demo-image2.jpg"
              alt="Free-ranging hens"
              class="rounded object-cover w-full h-56"
            />
          </div>

          <ProseH2>Embedded video</ProseH2>
          <p>
            Here’s an example of an embedded YouTube video in a responsive
            container.
          </p>
          <div
            class="relative w-full overflow-hidden rounded"
            style="padding-top: 56.25%"
          >
            <iframe
              class="absolute left-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Chicken care basics"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>

          <ProseH2>Subheadings showcase</ProseH2>
          <p>
            Use different heading levels to structure long-form content clearly.
          </p>
          <ProseH3>Section H3</ProseH3>
          <p>Great for main sections within the article.</p>
          <ProseH4>Subsection H4</ProseH4>
          <p>Useful for breaking down complex topics.</p>
          <ProseH5>Detail H5</ProseH5>
          <p>Smaller heading for fine-grained details.</p>
          <ProseH6>Note H6</ProseH6>
          <p>Lowest-level heading for minor notes or references.</p>

          <ProseH2>Further reading</ProseH2>
          <ol>
            <li><ProseA href="#">How to predator-proof your coop</ProseA></li>
            <li><ProseA href="#">Layer feed vs. grower feed</ProseA></li>
            <li><ProseA href="#">Seasonal care for heat and cold</ProseA></li>
          </ol>
        </template>
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
