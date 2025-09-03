
import { Pie } from 'react-chartjs-2'
import { Chart,ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend);

interface Props {
    data:{activity:string, hours:number}[]
}

const TimeChart = ({ data }:Props) => {
    
  
  const chartData = {
    labels: data.map((d) => d.activity),
    datasets: [
      {
        label: "Hours",
        data: data.map((d) => d.hours),
        backgroundColor: [
          "#08CB00",
          "#253900",
          "#F5BABB",
          "#FF9B00",
          "#D6A99D",
          "#0046FF",
          "#E43636",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData}/>
};

export default TimeChart