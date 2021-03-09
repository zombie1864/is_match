import { PieChart, Pie, Cell } from "recharts";
interface Iprops {
    isMatch: {
        YESs: number, 
        NOs: number 
    }
}

const PieChartComp = (props: Iprops) => {
    const COLORS = ["#0088FE", "#FF0000"]; 
    const data = [
        { value: props.isMatch.YESs },
        { value: props.isMatch.NOs },
    ];

    function renderCustomizedLabel({cx,cy,midAngle,innerRadius,outerRadius, index}: any) {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const dataEntries = Object.entries(props.isMatch) 

        return (
            <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            >
                {dataEntries[index][0]}: {dataEntries[index][1]}
            </text>
        );
    };

    return (
        <div>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                dataKey="value"
              >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
        </div>
    );
}

export default PieChartComp
