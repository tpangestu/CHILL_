import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Series from './pages/Series';
import Film from './pages/Film';
import MyList from './pages/MyList';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Payment from './pages/Payment';
import Watch from './pages/Watch';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes (without navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Routes (with navbar - RouterLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/film" element={<Film />} />
          <Route path="/daftar-saya" element={<MyList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* Watch Route (full screen, no navbar) */}
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
