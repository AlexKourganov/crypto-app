import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import {
  useGetCryptosQuery,
  useGetCryptosGlobalQuery,
} from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

// Note ant devides into 24 sections
const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const { data: globalData, isFetching: isFetchingGlobal } =
    useGetCryptosGlobalQuery();

  const globalStats = globalData?.data;
  console.log(globalStats);

  if (isFetching && isFetchingGlobal) {
    console.log(`Loader Hit`);
    return <Loader />;
  }

  if (globalStats === "undefined") {
    console.log(`global hit`);
    return <div>WOOOPS!</div>;
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        {typeof globalStats !== "undefined" && globalStats != null ? (
          <>
            <Col span={12}>
              <Statistic
                title="Total Cryptocurrencies"
                value={
                  typeof globalStats.active_cryptocurrencies !== "undefined" &&
                  globalStats.active_cryptocurrencies != null
                    ? `${millify(globalStats.active_cryptocurrencies)}`
                    : `N/A`
                }
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Market Cap %"
                value={
                  typeof globalStats.market_cap_percentage.usdt !==
                    "undefined" &&
                  globalStats.market_cap_percentage.usdt != null
                    ? `${millify(globalStats.market_cap_percentage.usdt)}`
                    : `N/A`
                }
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Market Cap"
                value={
                  typeof globalStats.total_market_cap.usd !== "undefined" &&
                  globalStats.total_market_cap.usd != null
                    ? `$ ${millify(globalStats.total_market_cap.usd)}`
                    : `N/A`
                }
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total 24h Volume"
                value={
                  typeof globalStats.total_volume.usd !== "undefined" &&
                  globalStats.total_volume.usd != null
                    ? `$ ${millify(globalStats.total_volume.usd)}`
                    : `N/A`
                }
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Markets"
                value={
                  typeof globalStats.markets !== "undefined" &&
                  globalStats.markets != null
                    ? `${millify(globalStats.markets)}`
                    : `N/A`
                }
              />
            </Col>
          </>
        ) : (
          `N/A`
        )}
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      {/* only want to show first 10 currencies and news so pass a prop*/}
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
