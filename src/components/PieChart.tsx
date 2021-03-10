import React, { Component } from "react";
import {Pie} from 'react-chartjs-2'
import 'chartjs-plugin-labels'

interface Iprops {
    // isMatch: {
        YESs: number, 
        NOs: number 
    // }
}

class PieChartComp extends Component<{isMatch:Iprops}> {
    render() {
        return (
            <div>
                <Pie
                    data={{
                    labels: [`NOs: ${this.props.isMatch.NOs}`, `YESs: ${this.props.isMatch.YESs}`],
                    datasets: [
                        {
                        data: [this.props.isMatch.NOs, this.props.isMatch.YESs],
                        backgroundColor: [
                            '#FF0000',
                            'rgba(54, 162, 235)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        },
                    ]}}
                    height={400}
                    width={600}
                    options={{
                        plugins: {
                                labels: {
                                    render: 'label',
                                    color:'black',
                                    fontSize: 25,
                                    fontColor: '#000000',
                                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                                },
                        },
                        legend: {
                            display: false,
                            labels: {
                            fontSize: 25,
                            },
                        },
                    }}
                />
            </div>
        )
    }
}

export default PieChartComp
