// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { menu } from '../utils/authorization';

import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Profile from './components/Profile';

function App() {
  const hasPermission = (permission) => {
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    const { role } = decoded;
    return menu[permission].permissions.includes(role);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {hasPermission('dashboard') && (
              <li>
                <Link to="/menu/dashboard">Dashboard</Link>
              </li>
            )}
            {hasPermission('users') && (
              <li>
                <Link to="/menu/users">Users</Link>
              </li>
            )}
            {hasPermission('products') && (
              <li>
                <Link to="/menu/products">Products</Link>
              </li>
            )}
            {hasPermission('profile') && (
              <li>
                <Link to="/menu/profile">Profile</Link>
              </li>
            )}
          </ul>
        </nav>

        <Switch>
          <Route path="/menu/dashboard">
            <Dashboard />
          </Route>
          <Route path="/menu/users">
            <Users />
          </Route>
          <Route path="/menu/products">
            <Products />
          </Route>
          <Route path="/menu/profile">
            <Profile />
          </Route>
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