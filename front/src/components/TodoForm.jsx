// src/components/TodoForm.jsx
import React, { useState } from 'react';

const TodoForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({ title, description, completed: false });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="block text-center mb-2">Todo</label>
        <input 
          type="text" 
          placeholder="Write here a todo!" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border-none"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-center mb-2">Description</label>
        <input 
          type="text" 
          placeholder="Here expand briefly" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg border-none"
        />
      </div>
      
      <button 
        type="submit"
        className="bg-gray-300 hover:bg-gray-400 py-2 px-6 rounded-lg block mx-auto transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;