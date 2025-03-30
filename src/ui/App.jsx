import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [storage, setStorage] = useState(0);
  const [staticData, setStaticData] = useState([]);

  useEffect(() => {
    window.electron.getData((data) => {
      setCpu(data.cpu);
      setRam(data.ram);
      setStorage(data.disk);
    });
  }, []);

  return (
    <>
      <p>CPU: {JSON.stringify(cpu)}</p>
      <p>RAM: {ram}</p>
      <p>STORAGE: {storage.toFixed()}</p>
    </>
  );
}

export default App;
