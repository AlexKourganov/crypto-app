import React,{useState,useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';
import Loader from './Loader';
import {useGetCryptosQuery} from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data:cryptosList,isFetching} = useGetCryptosQuery(count);
    
    const [cryptos,setCryptos] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');


    

    useEffect(() => {
        // setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData)
        
    }, [cryptosList,searchTerm])
    console.log(cryptos)
    if(isFetching) return <Loader />;
    
// gutter is space between object left right top and bottom
// xs defines width for small screens
    return (
        <>
        {!simplified && (
        <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)} />
    </div>
        )}
            
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos?.map((currency)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card title={`${currency.market_cap_rank}. ${currency.name}`}
                                  extra={<img className="crypto-image" src={currency.image}/>}  
                                  hoverable
                            >
                                <p>Price: {(typeof(currency.current_price) !== 'undefined' && (currency.current_price) != null) ?   `$ ${millify(currency.current_price)}` : `N/A`}</p>
                                <p>Market Cap: {(typeof(currency.market_cap) !== 'undefined' && (currency.market_cap) != null) ?   `$ ${millify(currency.market_cap)}` : `N/A`}</p>
                               
                                <p>Daily Change: { (typeof(currency.price_change_percentage_24h) !== 'undefined' && (currency.price_change_percentage_24h) != null) ?   `$ ${millify(currency.price_change_percentage_24h)}` : `N/A`}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
