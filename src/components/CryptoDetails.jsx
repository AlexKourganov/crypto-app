import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Typography, Row, Col, Select } from "antd";
import LineChart from "./LineChart";
import Loader from "./Loader";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const currentDate = new Date().getTime();

  const { coinId } = useParams();
  const [timePeriod, setTimeperiod] = useState(
    Math.round(currentDate / 1000) - 7 * 24 * 3600
  );
  // get coin data
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetchingHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.market_data;

  let convertDate = (time) => {
    let current;
    if (time === "24h") {
      let endDate = Math.round(currentDate / 1000) - 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "7d") {
      let endDate = Math.round(currentDate / 1000) - 7 * 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "30d") {
      let endDate = Math.round(currentDate / 1000) - 30 * 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "1y") {
      let endDate = Math.round(currentDate / 1000) - 365 * 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "3m") {
      let endDate = Math.round(currentDate / 1000) - 90 * 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "3y") {
      let endDate = Math.round(currentDate / 1000) - 365 * 3 * 24 * 3600;
      setTimeperiod(endDate);
    } else if (time === "5y") {
      let endDate = Math.round(currentDate / 1000) - 365 * 5 * 24 * 3600;
      setTimeperiod(endDate);
    }
  };

  const time = ["24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  // if(!isFetching){
  //   console.log(data.links.homepage);
  // }
  if (isFetching) return <Loader />;
  const stats = [
    {
      title: "Price to USD",
      value:
        typeof cryptoDetails.current_price.usd !== "undefined" &&
        cryptoDetails.current_price.usd != null
          ? `$ ${cryptoDetails.current_price.usd}`
          : "N/A",
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank",
     value: typeof data.market_cap_rank !== "undefined" &&
     data.market_cap_rank != null
       ? `# ${data.market_cap_rank}`
       : "N/A",
      icon: <NumberOutlined /> },
    {
      title: "Price Change(24h)",
      value:
        typeof cryptoDetails.price_change_24h !== "undefined" &&
        cryptoDetails.price_change_24h != null
          ? `$ ${cryptoDetails.price_change_24h}`
          : "N/A",
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value:
        typeof cryptoDetails.market_cap.usd !== "undefined" &&
        cryptoDetails.market_cap.usd != null
          ? `$ ${cryptoDetails.market_cap.usd}`
          : "N/A",
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value:
        typeof cryptoDetails.high_24h.usd !== "undefined" &&
        cryptoDetails.high_24h.usd != null
          ? `$ ${cryptoDetails.high_24h.usd}`
          : "N/A",
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Hashing Algo",
      value:
        typeof data.hashing_algorithm !== "undefined" &&
        data.hashing_algorithm != null
          ? `$ ${data.hashing_algorithm}`
          : "UNKNOWN",
      icon: <FundOutlined />,
    },
    {
      title: "Fully Diluted Valuation",
      value:
        typeof cryptoDetails.fully_diluted_valuation.usd !== "undefined" &&
        cryptoDetails.fully_diluted_valuation.usd != null
          ? `$ ${cryptoDetails.fully_diluted_valuation.usd}`
          : "N/A",
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Max Supply",
      value: cryptoDetails.max_supply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value:
        typeof cryptoDetails.total_supply !== "undefined" &&
        cryptoDetails.total_supply != null
          ? `$ ${millify(cryptoDetails.total_supply)}`
          : `N/A`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value:
        typeof cryptoDetails.circulating_supply !== "undefined" &&
        cryptoDetails.circulating_supply != null
          ? `$ ${millify(cryptoDetails.circulating_supply)}`
          : `N/A`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data.name}({data.symbol}) Price
        </Title>
        <p>
          {data.name} live price in US dollars. View value statistics, market
          cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => convertDate(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {!isFetchingHistory && (
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.current_price.usd)}
          coinName={data.name}
        />
      )}

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {data.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {data.name}, such as the
              base and quote currency, the rank, and trading volume
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        {/*  */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the statistics of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {data.name}
          </Title>
          {HTMLReactParser(data.description.en)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {data.name} Links
          </Title>

          {data.links ? (
            <Row className="coin-link" key={data.links.homepage[0]}>
              <Title level={5} className="link-name">
                Home-Page
              </Title>
              <a href={data.links.homepage[0]} target="_blank" rel="noreferrer">
                {data.links.homepage[0]}
              </a>
            </Row>
          ) : (
            <></>
          )}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
