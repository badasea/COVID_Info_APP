<template>
  <div class="tac">
    <el-row>
      <el-col>
        <el-menu :isCollapse="isCollapse">
          <el-sub-menu
            v-for="menu in menuItem"
            :key="menu.index"
            :index="menu.index"
          >
            <template #title>
              <el-icon><component :is="menu.icon" /></el-icon>
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item
              @click="handleSelect(item)"
              v-for="item in menu.submenus"
              :key="item.index"
              :index="item.index"
              >{{ item.label }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Location, Setting } from "@element-plus/icons";
import { reactive, toRefs } from "vue";
export default {
  name: "sidemenu",
  components: { Location, Setting },
  props: {
    isCollapse: Boolean,
  },
  setup(props, context) {
    const state = reactive({
      menuItem: [
        {
          label: "코로나 현황",
          index: "corona-briefing",
          icon: "location",
          submenus: [
            {
              label: "Summary by country.",
              index: "InternationalCases",
              path: "corona",
            },
            {
              label: "Korean summary",
              index: "DomesticCases",
              path: "corona",
            },
          ],
        },
        {
          label: "코로나 분석",
          index: "corona-analysis",
          icon: "setting",
          submenus: [
            {
              label: "샘플메뉴1",
              index: "sample1",
              path: "corona",
            },
            {
              label: "샘플메뉴2",
              index: "sample2",
              path: "corona",
            },
          ],
        },
      ],
    });
    const handleSelect = (item) => {
      context.emit("menuSelect", item);
    };
    return {
      ...toRefs(state),
      handleSelect,
    };
  },
};
</script>

<style>
.tac {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-item {
  height: 100%;
}
</style>
