import { computed, onMounted, onUnmounted, ref } from "vue";

export default function useBreakpoint() {
  let windowwidth = ref(window.innerWidth);
  const onWidChange = () => {
    windowwidth.value = window.innerWidth;
  };
  onMounted(() => {
    window.addEventListener("resize", onWidChange);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onWidChange);
  });
  const type = computed(() => {
    let size = "sm";
    if (windowwidth.value > 549 && windowwidth.value < 1200) size = "md";
    if (windowwidth.value > 1199) size = "lg";
    return size;
  });
  return {
    type,
  };
}
