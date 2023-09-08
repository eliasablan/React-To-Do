import { CreateTodoButton } from './components/CreateTodoButton';
import { CreateTodoSlide } from './components/CreateTodoSlide';

function App() {

  return (
    <>
      <div className="text-center">
        <CreateTodoButton />
      </div>
      <CreateTodoSlide />
    </>
  );
}

export default App;
