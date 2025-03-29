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

async function getRamUsage() {
  const ramUsage = await ram.info();
  return Math.floor(ramUsage.usedMemMb / 1024);
}

function getStorageUsage() {
  const stats = fs.statfsSync("C://");
  const total = (stats.bsize * stats.blocks) / 1e9;
  const free = (stats.bsize * stats.bfree) / 1e9;

  const usage = total - free;

  return { total, free, usage };
}
