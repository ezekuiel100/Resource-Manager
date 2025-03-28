import osu from "node-os-utils";
import { getDiskInfo, getDiskInfoSync } from "node-disk-info";

const cpu = osu.cpu;
const ram = osu.mem;
const os = osu.os;

export function resources() {
  setInterval(async () => {
    const cpuUsage = await cpu.usage();
    const ramUsage = await ram.info();
    const disks = getDiskInfoSync();

    for (const disk of disks) {
      console.log("Total: " + disk._blocks / 1e9);
      console.log("Usado: " + disk._used / 1e9);
      console.log("Disponivel: " + disk._available / 1e9);
      console.log("Capacidade usada: " + disk._capacity);
    }
  }, 1000);
}
