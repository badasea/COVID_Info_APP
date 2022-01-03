<template>
  <div>
    <h2>국제 현황</h2>
  </div>
</template>

<script>
import coronaMixin from "@/mixins/coronaMixin";
export default {
  name: "InternationalCases",
  mixins: [coronaMixin],
  mounted() {
    this.fetchCases();
  },
  methods: {
    async fetchCases() {
      const url = "https://api.covid19api.com/summary";
      const summary = await this.fetchData("get", url);
      console.log(summary, "res");
    },
  },
};
</script>

<style></style>
