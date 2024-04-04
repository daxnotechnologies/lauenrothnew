import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const { loaded } = useAuth();

  if (loaded) {
    console.log('current User', currentUser);
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  } else {
    return (
      <div style={{ minHeight: '100vh' }} className="w-100 d-flex align-items-center justify-content-center">
        <div class="spinner-box">
          <div class="pulse-container">
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
