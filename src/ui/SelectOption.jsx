import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function SelectOption({ title, subTitle, data, y = 100 }) {
  return (
    <div className="selectOption">
      <div className="title">
        {title} <span>{subTitle}</span>
      </div>
      <AreaChart width={300} height={70} data={data}>
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
        <YAxis domain={[0, y]} stroke="transparent" width={0} />
      </AreaChart>
    </div>
  );
}
