import AppRoutes from './routes/AppRoutes';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider> {/* ✅ Bọc toàn bộ ứng dụng */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
