import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
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
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const timeOptions = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    if (isFetching) return <Loader />;

    const crypto = data?.data?.coin;

    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${millify(crypto?.price || 0)}`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: 'Rank',
            value: crypto?.rank,
            icon: <NumberOutlined />,
        },
        {
            title: '24h Volume',
            value: `$ ${millify(crypto?.volume || 0)}`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: 'Market Cap',
            value: `$ ${millify(crypto?.marketCap || 0)}`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: 'All-time-high (daily avg.)',
            value: `$ ${millify(crypto?.allTimeHigh?.price || 0)}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: 'Number Of Markets',
            value: crypto?.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: 'Number Of Exchanges',
            value: crypto?.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: 'Approved Supply',
            value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: 'Total Supply',
            value: `$ ${millify(crypto?.supply?.total || 0)}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: 'Circulating Supply',
            value: `$ ${millify(crypto?.supply?.circulating || 0)}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {crypto?.name} ({crypto?.symbol}) Price
                </Title>
                <p>
                    {crypto?.name} live price in US Dollar (USD). View value statistics, market cap, and supply.
                </p>
            </Col>

            <Select
                defaultValue="7d"
                value={timePeriod}
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
            >

                {timeOptions.map((time) => (
                    <Option key={time} value={time}>{time}</Option>
                ))}

            </Select>

            <LineChart
                key={timePeriod}
                coinHistory={coinHistory}
                currentPrice={millify(crypto?.price || 0)}
                coinName={crypto?.name}
            />

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {crypto?.name} Value Statistics
                        </Title>
                        <p>
                            Overview of {crypto?.name} stats like base/quote currency, rank, and trading volume.
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                        <p>
                            Additional data about {crypto?.name}, including supply details and exchange info.
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
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
                    <Title level={3} className="coin-details-heading">What is {crypto?.name}?</Title>
                    {HTMLReactParser(crypto?.description || '')}
                </Row>

                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">{crypto?.name} Links</Title>
                    {crypto?.links?.map((link, index) => (
                        <Row className="coin-link" key={`${link.name}-${link.url}-${index}`}>
                            <Title level={5} className="link-name">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;
