<template>
  <div class="main">
    <el-container>
      <el-header><BasicHeader /></el-header>
      <el-container>
        <el-aside width="200px"><SideMenu /></el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BasicHeader from "./BasicHeader.vue";
import SideMenu from "./SideMenu.vue";

export default {
  name: "basiclayout",
  components: { BasicHeader, SideMenu },
};
</script>

<style scoped>
.el-header {
  background: #409eff;
  display: flex;
  color: #fff;
  align-items: center;
}
.main {
  height: 100%;
}
</style>
