// src/pages/TodoPage.jsx
import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import useTasks from '../hooks/useTasks';

const TodoPage = () => {
  const { 
    tasks, 
    isLoading, 
    error, 
    addTask, 
    editTask, 
    removeTask, 
    clearAllTasks, 
    toggleComplete 
  } = useTasks();

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      clearAllTasks();
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo list</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <TodoForm onAddTask={addTask} />
      
      {isLoading ? (
        <div className="text-center my-8">Loading your tasks...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <TodoList 
              title="Still to do" 
              tasks={tasks.filter(task => !task.done)}
              onToggleComplete={toggleComplete}
              onEdit={editTask}
              onDelete={removeTask}
              bgColor="bg-orange-500"
              cardColor="bg-yellow-400"
            />
            <TodoList 
              title="Done" 
              tasks={tasks.filter(task => task.done)}
              onToggleComplete={toggleComplete}
              onEdit={editTask}
              onDelete={removeTask}
              bgColor="bg-green-800"
              cardColor="bg-green-600"
              textColor="text-white"
            />
          </div>
          
          <button 
            onClick={handleDeleteAll}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-8 transition-colors"
          >
            Delete All
          </button>
        </>
      )}
      
      <footer className="text-center mt-8 text-gray-600">Done by Javi ©</footer>
    </div>
  );
};

export default TodoPage;