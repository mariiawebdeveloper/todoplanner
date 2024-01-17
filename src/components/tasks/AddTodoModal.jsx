import React, { useState } from 'react';
import AddToDoList from './AddToDoList';

function AddToDoModal({ setTodo, onClose }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
                        <h2>Add New</h2>
                        <AddToDoList setTodo={setTodo} onClose={handleClose} />
                    </div>
                </div>
            )}
        </>
    );
}

export default AddToDoModal;
