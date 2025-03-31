// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ 
  title, 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  bgColor = "bg-orange-500",
  cardColor = "bg-yellow-400",
  textColor = "text-black"
}) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h2 className="text-xl font-bold text-center text-white mb-4">{title}</h2>
      
      {tasks.length === 0 ? (
        <p className="text-center text-white py-4">No items</p>
      ) : (
        tasks.map(task => (
          <TodoItem
            key={task._id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            cardColor={cardColor}
            textColor={textColor}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;