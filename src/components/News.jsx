import { Select, Avatar, Col, Row, Typography, Card } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory: newsCategory,
        simplified: simplified,
    });

    console.log({ cryptoNews, simplified });

    if (!cryptoNews?.data) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setNewsCategory(value);
                            console.log(value);
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptoNews?.data?.map((currency) => <Option key={currency.uuid} value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}

            {cryptoNews?.data?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div
                                className="news-image-container"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                }}
                            >
                                <Title className="news-title" level={4} style={{ flex: 1 }}>
                                    {news.title}
                                </Title>
                                <img
                                    src={news.thumbnail || demoImage}
                                    alt="news"
                                    style={{
                                        maxWidth: '100px',
                                        maxHeight: '100px',
                                        borderRadius: '8px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <p>
                                {news.description.length > 100
                                    ? `${news.description.slice(0, 100)}...`
                                    : news.description}
                            </p>
                            <div
                                className="provider-container"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Avatar src={news.thumbnail || demoImage} alt="provider" />
                                    <Text className="provider-name">{news.title.split(' ')[0]}</Text>
                                </div>
                                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
