// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Profile from './components/Profile';

function App() {
  const [menu, setMenu] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/menu', {
          headers: {
            Authorization: token
          }
        });
        setMenu(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {Object.keys(menu).map((key) => (
              <li key={key}>
                <Link to={`/menu/${key}`}>{menu[key].name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Switch>
          {Object.keys(menu).map((key) => (
            <Route key={key} path={`/menu/${key}`}>
              {React.createElement(menu[key].component)}
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// src/components/Dashboard.js
import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Nội dung của trang Dashboard */}
    </div>
  );
}

export default Dashboard;

// src/components/Users.js
import React from 'react';

function Users() {
  return (
    <div>
      <h1>Users</h1>
      {/* Nội dung của trang Users */}
    </div>
  );
}

export default Users;

// src/components/Products.js
import React from 'react';

function Products() {
  return (
    <div>
      <h1>Products</h1>
      {/* Nội dung của trang Products */}
    </div>
  );
}

export default Products;

// src/components/Profile.js
import React from 'react';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      {/* Nội dung của trang Profile */}
    </div>
  );
}

export default Profile;