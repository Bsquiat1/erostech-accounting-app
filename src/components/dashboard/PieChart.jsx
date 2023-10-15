import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import { Link } from 'react-router-dom';

const formatAsLiters = (value) => {
  return value + ' L';
};

const PieChart = () => {
  const [selectedDepot, setSelectedDepot] = useState('GAPCO');

  const depots = useSelector((state) => state.depot.depots);

  const selectedDepotData = depots.find((depot) => depot.name === selectedDepot);

  const totalAmount = selectedDepotData.products.Diesel + selectedDepotData.products.Super + selectedDepotData.products.Kerosene;

  const chartData = {
    series: [
      selectedDepotData.products.Diesel,
      selectedDepotData.products.Super,
      selectedDepotData.products.Kerosene,
    ],
    labels: ['Diesel', 'Super', 'Kerosene'],
    colors: ['#1C64F2', '#16BDCA', '#9061F9'],
    chart: {
      height: 800,
      width: '100%',
      type: 'pie',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25,
          formatter: function (value, { seriesIndex, dataPointIndex }) {
            return `${formatAsLiters(value)} (${((value / totalAmount) * 100).toFixed(2)}%)`;
          },
        },
      },
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
    },
  };

  const handleDepotChange = (event) => {
    setSelectedDepot(event.target.value);
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mr-2">Product Distribution</h5>
        <select
          value={selectedDepot}
          onChange={handleDepotChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          {depots.map((depot) => (
            <option key={depot.name} value={depot.name}>
              {depot.name}
            </option>
          ))}
        </select>
      </div>
      <div className="py-6" id="pie-chart">
        <ApexCharts options={chartData} series={chartData.series} type="pie" height={chartData.chart.height} />
      </div>
      <Link to="/depots"><a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Depots
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a></Link>
    </div>
  );
};

export default PieChart;
