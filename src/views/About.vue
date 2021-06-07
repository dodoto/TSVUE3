<template>
  <div class="about">
    <Sentence />
    <div style="height: 200px"></div>
    <Switch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sentence from "@/components/Sentence.vue";
import Switch from "@/components/Switch.vue";

export default defineComponent({
  components: {
    Sentence,
    Switch,
  },
});
</script>
