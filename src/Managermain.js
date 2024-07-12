import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const ManagerMain = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { dataField: 'name', text: 'Name', headerStyle: { backgroundColor: '#007bff', color: 'white' } },
    { dataField: 'date', text: 'Date', headerStyle: { backgroundColor: '#007bff', color: 'white' } },
    { dataField: 'reason', text: 'Reason', headerStyle: { backgroundColor: '#007bff', color: 'white' } }
  ];

  const defaultSorted = [{
    dataField: 'date',
    order: 'asc'
  }];

  const handleViewLeaves = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3002/leaves/${year}/${month}`);
      setLeaveData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch leave data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundImage: 'url("/company.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <h1 className="text-center text-light py-4">Manager Main Page</h1>
      <div className="form-group">
        <label htmlFor="year" className="text-light">Select Year:</label>
        <input type="text" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="month" className="text-light">Select Month:</label>
        <input type="text" className="form-control" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleViewLeaves}>View Leaves</button>
      <div className="mt-3">
        {loading ? (
          <p className="text-light">Loading...</p>
        ) : leaveData.length === 0 ? (
          <p className="text-light">No leaves found for the selected year and month.</p>
        ) : (
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={leaveData}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={paginationFactory()}
            striped
            hover
            bordered={false}
            wrapperClasses="table-responsive"
            headerClasses="thead-dark"
          />
        )}
      </div>
    </div>
  );
};

export default ManagerMain;
