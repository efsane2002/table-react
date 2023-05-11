import { Space, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const Orders = () => {


  const [filteredInfo, setFilteredInfo] = useState({});
  const [set, newSet] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});

 const converterDate = (date) => {
  return moment(date).format('MMMM Do YY')
 }

  fetch('https://northwind.vercel.app/api/orders')
  .then((res) =>  res.json())
  .then(data=> {
  newSet(data)
  });
  
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  
  
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.id.includes(value).Moment,
  
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
    },
   
    {
      title: 'customerId',
      dataIndex: 'customerId',
      key: 'customerId',
      sorter: (a, b) => a.customerId > b.customerId,
      sortOrder: sortedInfo.columnKey === 'customerId' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex:  ["shipAddress","city"],
      key: 'address',
    },
    {
      title: 'freight',
      dataIndex: 'freight',
      key: 'freight',
      sorter: (a, b) => a.freight - b.freight,
      sortOrder: sortedInfo.columnKey === 'freight' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'orderDate', 
      dataIndex: 'orderDate',
      key: 'orderDate',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.orderDat.includes(value),
      createdAt: new Date(),
      sorter: (a, b) => moment(a.orderDate) - moment(b.orderDate),
      sortOrder: sortedInfo.columnKey === 'orderDate' ? sortedInfo.order : null,
      ellipsis: true,
      render: (date) => converterDate(date),

     
    },
    {
      title: 'shippedDate',
      dataIndex: 'shippedDate',
      key: 'shippedDate',
   
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.shippedDate.includes(value),
      sorter: (a, b) => moment(a.shippedDate) - moment(b.shippedDate),
      sortOrder: sortedInfo.columnKey === 'shippedDate' ? sortedInfo.order : null,
      ellipsis: true,
      render: (date) => converterDate(date),

    },
    {
      title: 'requiredDate',
      dataIndex: 'requiredDate',
      key: 'requiredDate',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.requiredDate.includes(value),
      sorter: (a, b) => moment(a.requiredDate) - moment(b.requiredDate),
      sortOrder: sortedInfo.columnKey === 'requiredDate' ? sortedInfo.order : null,
      ellipsis: true,
      render: (date) => converterDate(date)
    },
    
    
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 20,
        }}
      >
      </Space>
      <Table columns={columns} dataSource={set} onChange={handleChange} style={{width: "1000px", height: "400px", margin: "0 auto"}}/>
    </>
  );
};
export default Orders;