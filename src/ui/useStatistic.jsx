import { useEffect, useState } from "react";

export function useStatistic() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    window.electron.getData((data) => {
      setValue((prev) => {
        const newData = [...prev, data];

        if (newData.length > 10) {
          newData.shift();
        }

        return newData;
      });
    });
  }, []);

  const cpuData = value.map((value) => ({ value: value.cpu }));
  const ramData = value.map((value) => ({ value: value.ram }));
  const sotageData = value.map((value) => ({ value: value.disk }));

  return { cpuData, ramData, sotageData };
}
