import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ title, data, y = 100 }) {
  const COLOR_MAP = {
    CPU: { stroke: "#5DD4EE", fill: "#0A4D5C" },
    RAM: { stroke: "#E99311", fill: "#5F3C07" },
    STORAGE: { stroke: "#1ACF4D", fill: "#0B5B22" },
  };

  const color = COLOR_MAP[title];

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
        <Area
          fillOpacity={0.3}
          fill={color.fill}
          stroke={color.stroke}
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, y]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
