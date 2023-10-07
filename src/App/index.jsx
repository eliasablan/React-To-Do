import { TodoProvider } from '../TodoContext';
import { AuthProvider } from '../AuthContext';
import AppUI from './AppUI';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <AppUI />
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
