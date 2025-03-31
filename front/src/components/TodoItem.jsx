// src/components/TodoItem.jsx
import React, { useState } from 'react';

const TodoItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  cardColor = "bg-yellow-400",
  textColor = "text-black" 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task._id, { 
        title: editedTitle, 
        description: editedDescription 
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`${cardColor} p-4 rounded-lg mb-4 ${textColor}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-2 rounded text-black"
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 mb-2 rounded text-black"
          />
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg">{task.title}</h3>
          <p>{task.description}</p>
        </>
      )}
      
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => onToggleComplete(task._id)} 
          className="bg-white text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {task.done ? 'Undo' : 'Done!'}
        </button>
        <button 
          onClick={handleEdit} 
          className="bg-white text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="bg-white text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;