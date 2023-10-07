import { CheckUserContext } from './providers/checkUserContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <CheckUserContext>
      <AppRoutes />
    </CheckUserContext>
  );
}

export default App;
