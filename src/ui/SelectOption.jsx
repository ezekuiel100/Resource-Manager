import Chart from "./Chart";

export default function SelectOption({ title, subTitle, data, y, onClick }) {
  return (
    <div className="selectOption" onClick={onClick}>
      <div className="title">
        {title} <span>{subTitle}</span>
      </div>

      <div className="selectOptionChart">
        <Chart title={title} data={data} y={y} />
      </div>
    </div>
  );
}
