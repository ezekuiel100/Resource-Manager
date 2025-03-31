import { useEffect, useState } from "react";
import "./App.css";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useStatistic } from "./useStatistic";

function App() {
  const [staticData, setStaticData] = useState();
  const { cpuData, ramData, sotageData } = useStatistic();

  useEffect(() => {
    window.electron.getStaticData().then((data) => {
      setStaticData(data);
    });
  }, []);

  return (
    <main>
      <div>
        <p>
          <span>CPU</span> {staticData?.cpuModel}
        </p>
        <AreaChart width={300} height={100} data={cpuData}>
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
      </div>

      <div>
        <p>
          <span>RAM</span> {staticData?.totalMemoryGB} GB
        </p>

        <AreaChart width={300} height={100} data={ramData}>
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
      </div>

      <div>
        <p>
          <span>STORAGE</span> {staticData?.totalStorage.toFixed()} GB
        </p>

        <AreaChart width={300} height={100} data={sotageData}>
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
          <YAxis domain={[0, 1000]} stroke="transparent" width={0} />
        </AreaChart>
      </div>
    </main>
  );
}

export default App;
