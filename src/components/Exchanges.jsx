import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data:exchangesList, isFetching } = useGetExchangesQuery();
 




  if (isFetching) return <Loader />;
  // if(!isFetching){
   
  // }
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Year Established</Col>
        <Col span={6}>Trust Score Rank</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${exchange.trade_volume_24h_btc && millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.year_established || 'N/A'}</Col>
                    <Col span={6}>{exchange.trust_score_rank}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || 'No Description Available At this Time!')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
