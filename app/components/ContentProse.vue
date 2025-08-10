<script setup lang="ts">
import ProseH1 from "./content/ProseH1.vue";
import ProseH2 from "./content/ProseH2.vue";
import ProseH3 from "./content/ProseH3.vue";
import ProseH4 from "./content/ProseH4.vue";
import ProseH5 from "./content/ProseH5.vue";
import ProseH6 from "./content/ProseH6.vue";
import ProseImg from "./content/ProseImg.vue";
import ProseBlockquote from "./content/ProseBlockquote.vue";
import ProseA from "./content/ProseA.vue";
import ProseTable from "./content/ProseTable.vue";
import ProseP from "./content/ProseP.vue";
import ProseUl from "./content/ProseUl.vue";
import ProseOl from "./content/ProseOl.vue";
import ProsePre from "./content/ProsePre.vue";
import ProseHr from "./content/ProseHr.vue";
import ProseCode from "./content/ProseCode.vue";

const props = defineProps<{ value: unknown }>();
const components = {
  h1: ProseH1,
  h2: ProseH2,
  h3: ProseH3,
  h4: ProseH4,
  h5: ProseH5,
  h6: ProseH6,
  p: ProseP,
  img: ProseImg,
  blockquote: ProseBlockquote,
  a: ProseA,
  ul: ProseUl,
  ol: ProseOl,
  pre: ProsePre,
  hr: ProseHr,
  code: ProseCode,
  table: ProseTable,
};
</script>

<template>
  <div class="prose dark:prose-invert max-w-none">
    <ContentRenderer :value="props.value" :components="components" />
  </div>
</template>
