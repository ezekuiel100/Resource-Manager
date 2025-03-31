import { useEffect, useState } from "react";
import "./App.css";
import { useStatistic } from "./useStatistic";
import SelectOption from "./SelectOption";
import Chart from "./Chart";

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
        <Chart
          title={activeView}
          data={activeUsages}
          y={activeView != "STORAGE" ? 100 : 1000}
        />
      </div>
    </main>
  );
}

export default App;
