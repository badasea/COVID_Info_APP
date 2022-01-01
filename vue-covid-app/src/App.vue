<template>
  <div>
    <Basiclayout
      @menuSelect="
        (item) => {
          content = item;
        }
      "
    >
      <MainContent :content="content" />
    </Basiclayout>
  </div>
</template>

<script>
import Basiclayout from "./components/layouts/BasicLayout.vue";
import MainContent from "./components/MainContent";

export default {
  name: "App",
  components: { Basiclayout, MainContent },
  data() {
    return {
      content: {
        label: "대시보드",
        index: "Dashboard",
        path: "main",
      },
    };
  },
};
</script>

<style></style>
