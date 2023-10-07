import { useState, useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PropTypes } from 'prop-types';

import { TodoContext } from '../TodoContext';

const CreateTodoSlide = ({ onClose }) => {
  const { createTodo } = useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    createTodo(newTodoValue);
    onClose();
  };

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  return (
    <div className="fixed z-50">
      <div className="absolute">
        <div className="fixed inset-y-0 right-0 flex">
          <div className="bg-ic flex h-full flex-col overflow-y-scroll py-6 shadow-2xl shadow-black">
            <div className="relative px-6">
              <button
                type="button"
                className="m-0 p-0 border-0 relative text-pg hover:text-sc"
                onClick={onClose}
              >
                <span className="absolute" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="inline h-7 w-7" aria-hidden="true" />
              </button>
            </div>
            <div className="relative mt-8 flex-1 px-6">
              {/* Your content */}
              <form onSubmit={onSubmit}>
                <label className="block">
                  <p className="text-2xl font-semibold text-rs">
                    New Task
                  </p>
                </label>
                <textarea
                  className="bg-sc text-rs text-lg font-semibold my-7 py-2 px-5 rounded-md placeholder:italic placeholder:font-semibold placeholder:text-at h-60"
                  placeholder="Enter your task here..."
                  value={newTodoValue}
                  onChange={onChange}
                />
                <div className="grid grid-cols-1">
                  <button
                    className="mb-1 text-rs border-sc bg-ic hover:bg-sc"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button className="text-rs border-sc bg-ic hover:bg-sc">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateTodoSlide.propTypes = {
  onClose: PropTypes.func,
};

export { CreateTodoSlide };
