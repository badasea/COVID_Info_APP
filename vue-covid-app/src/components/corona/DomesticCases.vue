<template>
  <div>
    <!-- <h2>Domestic status</h2> -->
    <ul class="graph-list">
      <li>
        <h3>누적 확진/사망자 추이</h3>
        <ChartGraph :chartOptions="domesticCases" :key="casekey" />
      </li>
      <li>
        <h3>확진자 대비 사망자</h3>
        <ChartGraph :chartOptions="domesticCompare" :key="comparekey" />
      </li>
    </ul>
  </div>
</template>

<script>
import ChartGraph from "../charts/ChartGraph.vue";
import coronaMixin from "@/mixins/coronaMixin";
import moment from "moment";

export default {
  name: "DomesticCases",
  components: { ChartGraph },
  mixins: [coronaMixin],
  data() {
    return {
      casekey: 0,
      comparekey: 0,
      monthDifference: 4,
      domesticData: [],
    };
  },
  computed: {
    domesticCases() {
      return {
        type: "line",
        labels: this.domesticData.map((dom) =>
          dom.Date.split("T")[0].substr(0, 7)
        ),
        datasets: [
          {
            label: "확진자",
            data: this.domesticData.map((dom) => dom.Confirmed),
            borderWidth: 1,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
          },
          {
            label: "사망자",
            data: this.domesticData.map((dom) => dom.Deaths),
            borderWidth: 1,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
          },
        ],
      };
    },
    domesticCompare() {
      const lastMonth = this.domesticData[this.domesticData.length - 1] || {};
      const deaths = lastMonth.Deaths;
      const confirmed = lastMonth.Confirmed;
      const data = [deaths, confirmed];
      return {
        type: "doughnut",
        labels: ["사망자", "확진자"],
        datasets: [
          {
            label: "확진자 대비 사망자",
            data,
            borderWidth: 1,
            backgroundColor: ["rgba(255,99,123, 0.2)", "rgba(54,162,235, 0.2)"],
            borderColor: ["rgba(255,99,123, 1)", , "rgba(54,162,235, 1)"],
          },
        ],
      };
    },
  },
  watch: {
    domesticCases: {
      handler() {
        this.casekey++;
      },
      deep: true,
    },
    domesticCompare: {
      handler() {
        this.comparekey++;
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchDomestic();
  },
  methods: {
    async fetchDomestic() {
      const to = moment().format("YYYY-MM-DD");
      const from = moment()
        .subtract(this.monthDifference, "months")
        .format("YYYY-MM-DD");
      const params = {
        to,
        from,
      };
      const url = "https://api.covid19api.com/live/country/south-korea";
      const domestic = await this.fetchData("get", url, params);
      this.setDomesticData(domestic);
    },
    setDomesticData(domestic) {
      let pick = 0;
      const targetDates = [];
      while (pick <= this.monthDifference) {
        targetDates.push(
          moment().subtract(pick, "months").utc().format().split("T")[0]
        );
        pick++;
      }
      this.domesticData = domestic.filter((dom) =>
        targetDates.includes(dom.Date.split("T")[0])
      );
      console.log(this.domesticData);
    },
  },
};
</script>

<style scoped>
.graph-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  list-style: none;
}
</style>
