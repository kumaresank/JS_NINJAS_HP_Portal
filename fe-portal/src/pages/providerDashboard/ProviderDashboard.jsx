import React from 'react';
import "./ProviderDashboard.css"
import Button from '../../components/button/Button';

const navItems = [{
  id: 0,
  text: "Dashboard"
},
{
  id: 1,
  text: "Patient List"
},
{
  id: 2,
  text: "Appointments"
},
{
  id: 3,
  text: "Messages"
},
{
  id: 4,
  text: "Logout"
}
]

const rowData = [
  { time: "9:00 AM", pName: "John Doe", reason: "Annual Check-up" },
  { time: "11:30 AM", pName: "John Smith", reason: "Follow-up" }
]

const rowData2 = [
  { name: "Alice Johnson", lVisit: "2023-06-01", action: "label"},
  { name: "Bob Williams", lVisit: "2023-05-28", action: "label" }
]


const NavItem = (props) => {
  const { id, text, handleClick } = props;
  return (
    <div id={id} className="menu-item" onClick={() => handleClick(id)} className="menu-item">{text}</div>
  )
}

function ProviderDashboard() {
  return <div className="dash-container" style={{ display: "flex-inline" }}>
    
    <div className='dash-sidebar'>
    <h2>Bayer Health</h2>
      {navItems.map(item => (<NavItem {...item} key={item.id} handleClick={() => { }} />))}
    </div>
    <div className="dash-content">
    <div >
      <h2>Welcome, Dr Smith</h2>
      <div className="dash-card">
        <h3>Today's Appointments</h3>
        <table border="0" style={{ border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map(row => <tr>
              <td>{row.time}</td>
              <td>{row.pName}</td>
              <td>{row.reason}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
    <div className="dash-card">
        <h3>Recent Patients</h3>
        <table border="0" style={{ border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Visits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowData2.map(row => <tr>
              <td>{row.name}</td>
              <td>{row.lVisit}</td>
              <td><Button label={"View Profile"} handleClick={()=>{}}/></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      </div>
  </div>;
}

export default ProviderDashboard;
