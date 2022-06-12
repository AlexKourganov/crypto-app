import React from 'react';
import {Line} from 'react-chartjs-2';
import { Typography, Row, Col} from "antd";

const {Title} = Typography;

const LineChart = ({coinHistory,currentPrice,coinName}) => {
    const coinPrice=[];
    const coinTimestamp=[];
   

    for (let i=0; i<coinHistory?.prices?.length;i++){
        coinPrice.push(coinHistory.prices[i][1]);
        coinTimestamp.push(new Date(coinHistory.prices[i][0]).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets:[
            {
                label: 'Price in USD',
                data: coinPrice,
                fill:false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            yAxes:[
                {
                    ticks:{
                        beginAtZero: true,
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart
