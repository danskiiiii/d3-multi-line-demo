import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Loader } from './Loader';
import { Chart } from './Chart';
import { timeParse, tsv } from 'd3';
import { ChartData } from './Chart/Chart.model';

function App() {
  const [data, setData] = useState<ChartData[]>();

  useEffect(() => {
    generateData();
  }, []);

  async function generateData() {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const tsvData = await tsv(
      'https://gist.githubusercontent.com/sjednac/6fb28bc259b84126a19504dce41fa93b/raw/902b74bb8b7d133e2c7bcc02ef467ae6528c0d78/data.csv'
    );

    const chartData: ChartData[] = [
      { name: 'Reactor_outlet_temperature_C', values: [] },
      { name: 'Reactor_hotspot_temperature_C', values: [] },
    ];
    const parseDate = timeParse('%d.%m.%y');

    for (const iterator of tsvData) {
      if (iterator.Date) {
        chartData[0].values.push({
          date: parseDate(iterator.Date) as Date,
          temperature: Number(iterator.Reactor_outlet_temperature_C),
        });
        chartData[1].values.push({
          date: parseDate(iterator.Date) as Date,
          temperature: Number(iterator.Reactor_hotspot_temperature_C),
        });
      }
    }

    setData(chartData);
  }

  return (
    <Layout>
      {data && <Chart data={data} />}
      {!data && <Loader />}
    </Layout>
  );
}

export default App;
