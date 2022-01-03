<template>
  <div class="main">
    <el-container>
      <el-header>
        <header>
          <img src="@/assets/logo.png" height="100" class="logo" />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=badasea&repo=COVID_Info_APP&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="90"
            height="20px"
          ></iframe></header
      ></el-header>
      <el-container>
        <el-aside :width="menuWidth"
          ><SideMenu
            :isCollapse="isCollapse"
            @menuSelect="
              (item) => {
                $emit('menuSelect', item);
              }
            "
        /></el-aside>
        <el-container>
          <el-main><slot></slot></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import BasicHeader from "./BasicHeader.vue";
import SideMenu from "./SideMenu.vue";
import useBreakpoint from "@/composables/useBreakpoint";
import { computed } from "vue";

export default {
  name: "basiclayout",
  components: {
    //BasicHeader,
    SideMenu,
  },
  setup() {
    const { type } = useBreakpoint();
    const isCollapse = computed(() => type.value === "sm");
    const menuWidth = computed(() => (isCollapse.value ? "65px" : "200px"));

    return {
      isCollapse,
      menuWidth,
    };
  },
};
</script>

<style scoped>
.el-header {
  background: linear-gradient(15deg, #00f, #0f0);
  display: flex;
  color: #fff;
  align-items: center;
}
.main {
  height: 100%;
}
header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
}
</style>
