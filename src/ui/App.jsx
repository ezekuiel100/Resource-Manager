import { useEffect, useState } from "react";
import "./App.css";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useStatistic } from "./useStatistic";
import SelectOption from "./SelectOption";

function App() {
  const [staticData, setStaticData] = useState();
  const { cpuData, ramData, storageData } = useStatistic();
  const [activeView, setActiveView] = useState("CPU");

  useEffect(() => {
    window.electron.getStaticData().then((data) => {
      setStaticData(data);
    });
  }, []);

  let activeUsages;

  switch (activeView) {
    case "CPU":
      activeUsages = cpuData;
      break;
    case "RAM":
      activeUsages = ramData;
      break;
    case "STORAGE":
      activeUsages = storageData;
      break;
  }

  return (
    <main>
      <div>
        <SelectOption
          title={"CPU"}
          subTitle={staticData?.cpuModel}
          data={cpuData}
          onClick={() => setActiveView("CPU")}
        />
        <SelectOption
          title={"RAM"}
          subTitle={staticData?.totalMemoryGB + " GB"}
          data={ramData}
          onClick={() => setActiveView("RAM")}
        />
        <SelectOption
          title={"STORAGE"}
          subTitle={staticData?.totalStorage.toFixed() + " GB"}
          data={storageData}
          y={1000}
          onClick={() => setActiveView("STORAGE")}
        />
      </div>

      <div className="mainGrid">
        <AreaChart width={400} height={150} data={activeUsages}>
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
          <YAxis
            domain={[0, activeView != "STORAGE" ? 100 : 1000]}
            stroke="transparent"
            width={0}
          />
        </AreaChart>
      </div>
    </main>
  );
}

export default App;
