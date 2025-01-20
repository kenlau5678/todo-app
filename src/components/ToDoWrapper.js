import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import { v4 as uuidv4 } from 'uuid';
import ToDo from './ToDo';
import EditToDoForm from './EditToDoForm';

const ToDoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // 添加新的todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // 切换任务完成状态
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 编辑任务
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, isEditing: !todo.isEditing }
          : todo
      )
    );
  };
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <ToDoForm addTodo={addTodo} />
      {todos.map((todo) => (
        todo.isEditing ? (
          <EditToDoForm
            editTodo={editTask}
            task={ todo}
          />
        ) : (
          <ToDo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      ))}
    </div>
  );
};

export default ToDoWrapper;
