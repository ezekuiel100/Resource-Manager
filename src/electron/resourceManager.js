import osu from "node-os-utils";
import fs from "fs";
import os from "os";

const cpu = osu.cpu;
const ram = osu.mem;

const ramInfo = await ram.info();

export function resources(win) {
  setInterval(async () => {
    const cpu = await getCpuUsage();
    const ram = await getRamUsage();
    const disk = getStorageUsage();

    win.webContents.send("system-stats", { cpu, ram, disk: disk.total });
  }, 1000);
}

async function getCpuUsage() {
  const cpuUsage = await cpu.usage();
  return cpuUsage;
}

async function getRamUsage() {
  const ramInfo = await ram.info();
  return ramInfo.freeMemPercentage;
}

function getStorageUsage() {
  const stats = fs.statfsSync("C://");
  const total = (stats.bsize * stats.blocks) / 1e9;
  const free = (stats.bsize * stats.bfree) / 1e9;

  const usage = total - free;

  return { total, free, usage };
}

export function getStaticData() {
  const totalStorage = getStorageUsage().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = (ramInfo.totalMemMb / 1024).toFixed(2);

  return { totalStorage, cpuModel, totalMemoryGB };
}
