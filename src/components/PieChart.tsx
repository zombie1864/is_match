import { PieChart, Pie, Cell } from "recharts";
interface Iprops {
    isMatch: {
        YESs: number, 
        NOs: number 
    }
}

const PieChartComp = (props: Iprops) => {
    const COLORS = ["#FF0000", "#0088FE"]; //NOs - red, YESs - blue 
    const RADIAN = Math.PI / 180;
    function renderCustomizedLabel({cx,cy,midAngle,innerRadius,outerRadius}: any) {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            >
            YES:{`${data[1].value}`}
            NOs:{`${data[0].value}`}
            </text>
        );
    };

    const data = [
        { value: props.isMatch.NOs },
        { value: props.isMatch.YESs },
      ];
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            {/* {renderCustomizedLabel()} */}
        </div>
      );
}

export default PieChartComp
