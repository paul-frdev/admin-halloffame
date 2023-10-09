import { ToastProvider } from './providers/ToastProvider';
import { CheckUserContext } from './providers/checkUserContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <CheckUserContext>
      <ToastProvider />
      <AppRoutes />
    </CheckUserContext>
  );
}

export default App;
