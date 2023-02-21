import './App.css';
import Login from './components/Login';
import Aboutme from './components/Aboutme';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEvent from './components/AddEvent';
import ContactForm from './components/ContactForm';
import OrganiserLogin from './components/OrganiserLogin';
import OrganiserRegister from './components/OrganiserRegister';
import EventList from './components/EventList';
function App() {
  return (
    <>
<BrowserRouter>
    <Navbar/>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Register' element={<Register/>}/>
  <Route path='/Aboutme' element={<Aboutme/>}/>
  <Route   path='*' element={<ErrorPage/>}/>
  <Route   path='/AddEvent' element={<AddEvent/>}/>
  <Route   path='/ContactForm' element={<ContactForm/>}/>
  <Route   path='/EventList' element={<EventList/>}/>
 </Routes>
</BrowserRouter>
   
  </>
  );
}

export default App;
