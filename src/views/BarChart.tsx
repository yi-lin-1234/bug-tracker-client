import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { groupBugs } from "../util/helper";
import { getAllBugs } from "../apiService";
import { ChartData } from "../type";

// eslint-disable-next-line
import "chart.js/auto";

function BarChart() {
  const [chartDataCategory, setChartDataCategory] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Bugs",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllBugs();
        const groupedData = groupBugs(data);
        const labelsCategory = groupedData.map((obj) => obj.category);
        const dataCategory = groupedData.map((obj) => obj.count);
        setChartDataCategory({
          labels: labelsCategory,
          datasets: [
            {
              label: "Number of Bugs",
              data: dataCategory,
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bug Statistics
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
              <Bar
                data={chartDataCategory}
                options={{ responsive: true, indexAxis: "y" }}
              />
            </div>
            <p className="mt-4 text-base text-gray-500">
              This chart represents the distribution of bugs across different
              categories. Gain insights into the numbers of bugs in each
              category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
