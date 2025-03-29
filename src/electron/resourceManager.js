import osu from "node-os-utils";
import fs from "fs";
import { webContents } from "electron";

const cpu = osu.cpu;
const ram = osu.mem;
const os = osu.os;

export async function resources() {
  const cpu = await getCpuUsage();
  const ram = await getRamUsage();
  const disk = getStorageUsage();

  return { cpu, ram, disk: disk.usage };
}

async function getCpuUsage() {
  const cpuUsage = await cpu.usage();
  return cpuUsage;
}
