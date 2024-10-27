<script setup lang="ts">
import { computed } from 'vue'

export type TextVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p1'
    | 'p2'
    | 'p3'
    | 'p4'
    | 'p5'
    | 'p6'

type Props = {
  variant: TextVariant
  bold?: boolean
  secondary?: boolean
  tetriary?: boolean
  plainHtml?: string
}
const props = withDefaults(defineProps<Props>(), {
  bold: false,
  secondary: false,
  tetriary: false,
  plainHtml: '',
})

const isParagraph = computed(() => props.variant.includes('p'))

const type = computed(() => (isParagraph.value ? 'p' : props.variant))
</script>

<script lang="ts">
export default {}
</script>

<template>
  <component
      :is="type"
      class="app-text"
      :class="{ bold: bold, [variant]: isParagraph, secondary: secondary, tetriary: tetriary }"
  >
    <span v-if="plainHtml" data-testid="cmp:AppText_id:plainHtml" v-html="plainHtml" />
    <slot v-else />
  </component>
</template>

<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: var(--kit-Font-Primary);
  font-style: normal;
  font-weight: var(--font-weight-normal);
  padding: 0;
  margin: 0;
  &.bold {
    font-weight: var(--font-weight-bold);
  }
  &.secondary {
    color: var(--kit-Font-Secondary);
  }
  &.tetriary {
    color: var(--kit-Font-Tetriary);
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-title);
}
p {
  font-family: var(--font-family-paragraph);
}
h1 {
  font-size: 5.8rem;
  line-height: 124%;
}
h2 {
  font-size: 4.5rem;
  line-height: 115%;
}
h3 {
  font-size: 3.5rem;
  line-height: 114%;
}
h4 {
  font-size: 2.8rem;
  line-height: 143%;
}
h5 {
  font-size: 2.2rem;
  line-height: 127%;
}
h6 {
  font-size: 1.6rem;
  line-height: 125%;
}
p {
  &.p1 {
    font-size: 2.2rem;
    line-height: 145%;
  }
  &.p2 {
    font-size: 1.8rem;
    line-height: 156%;
  }
  &.p3 {
    font-size: 1.6rem;
    line-height: 150%;
  }
  &.p4 {
    font-size: 1.4rem;
    line-height: 143%;
  }
  &.p5 {
    font-size: 1.2rem;
    line-height: 150%;
  }
  &.p6 {
    font-size: 1rem;
    line-height: 140%;
  }
}
</style>
