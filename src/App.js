import './App.css';
import Teacher from './pages/Teacher';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import EditTeacher from './pages/EditTeacher';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Teacher/>}></Route>
      <Route path='/editTeacher' element={<EditTeacher/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
