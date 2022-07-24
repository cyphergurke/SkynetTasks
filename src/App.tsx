import React, { useState } from 'react';
import InputField from './Components/Input/InputField';
import TodoList from './Components/TodoList/TodoList';
import { Todo } from './model'
import './Styles/App.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import PortalProvider from './Context/PortalContext';
//import { Settings } from './Components/Settings/Settings';
//import { Footer } from './Components/Footer/Footer';  
import { MySkyLogin } from './Components/MySky/MySky';



const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return

    if (destination.droppableId === source.droppableId
      && destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };


  return (
    <PortalProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <MySkyLogin todos={todos} setTodos={setTodos}
            completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
          />

          <span className='heading'>Skynet Tasks</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList todos={todos} setTodos={setTodos}
            completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
          />

        </div>
      </DragDropContext>

    </PortalProvider >
  );
}

export default App;
/* 
<div className='footer'>
<Footer />
</div> */