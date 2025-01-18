import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
    const axiosSecure = useAxiosSecure();
    const {data:statData=[]} = useQuery({
        queryKey:['statData'],
        queryFn:async()=>{
            const res = await axiosSecure('/bookings-data');
            return res.data
        }
    })
    const dates = statData.map(item=>item.date);
    const counts = statData.map(item=>item.count);
    console.log(dates,counts);
    const state = {
        series: [{
            data: counts
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: dates,
            }
        },
    }
    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
};

export default BarChart;