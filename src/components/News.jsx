import React,{useState} from 'react';
import {Select,Typography,Row,Col,Avatar,Card} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';
import {useGetCryptosQuery} from '../services/cryptoApi';
import demoImage  from '../images/demopic.jpg';
import Loader from './Loader';

const {Text,Title} = Typography;
const {Option}= Select;



const News = ({simplified}) => {
//     const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
//     const {data:cryptoNews,isFetching}=useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12 });
//     const {data:cryptosList,isFetchingCrypto} = useGetCryptosQuery(100);
    

//     if(isFetching) return <Loader />;


    return (
       
        <div>News</div>
    )
}

export default News
