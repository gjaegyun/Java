import Main from './Main';
import Ask from './Pages/Ask';
import { Routes, Route} from 'react-router-dom';
import DetailPage from './Pages/DetailPage';
import Update from './Pages/Update';

function App() {
  return (
      <div>
        <Routes>
          <Route path = "/" element={<Main/>} />
          <Route path = "/ask" element={<Ask/>} />
          <Route path = "/detail/:id" element={<DetailPage />} />
          <Route path = "/update/:id" element={<Update />} />
        </Routes>
      </div>
  );
}

export default App;
