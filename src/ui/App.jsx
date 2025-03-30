import { useEffect, useState } from "react";
import "./App.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const [cpu, setCpu] = useState([]);
  const [ram, setRam] = useState(0);
  const [storage, setStorage] = useState(0);
  const [staticData, setStaticData] = useState();

  useEffect(() => {
    window.electron.getData((data) => {
      setCpu((prev) => {
        const newData = [...prev, data.cpu];

        if (newData.length > 10) {
          newData.shift();
        }

        return newData;
      });
    });
    window.electron.getStaticData().then((data) => {
      setStaticData(data);
    });
  }, []);

  const preparedCpuData = cpu.map((value) => ({ value }));

  return (
    <main>
      <p>
        <span>CPU</span> {staticData?.cpuModel}
      </p>

      <AreaChart width={300} height={100} data={preparedCpuData}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
        <Area
          fillOpacity={0.3}
          fill="#8884d8"
          stroke="#8884d8"
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>

      <p>
        <span>RAM</span> {staticData?.totalMemoryGB} GB
      </p>
      <p>
        <span>STORAGE</span> {staticData?.totalStorage.toFixed()} GB
      </p>
    </main>
  );
}

export default App;
