<script>
import Vue from "vue";
import { Bar } from "vue-chartjs";

export default Vue.extend({
  extends: Bar,
  props: ["reportData"],
  data() {
    return {
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  computed: {
    chartdata() {
      let data = [];
      let labels = [];
      for (const [channel, count] of Object.entries(this.reportData)) {
        data.push(count);
        labels.push(channel);
      }
      return {
        datasets: [
          {
            label: "videos",
            data,
          },
        ],
        labels,
      };
    },
  },
});
</script>
