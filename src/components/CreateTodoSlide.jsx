import { useState, useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PropTypes } from 'prop-types';

import { TodoContext } from '../TodoContext';

const CreateTodoSlide = ({ onClose }) => {
  const { createTodo } = useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    createTodo(event);
    onClose();
  };

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="bg-at flex h-full flex-col overflow-y-scroll py-6 shadow-xl shadow-black">
            <div>
              <button
                type="button"
                className="font-semibold relative rounded-md px-4 text-sc hover:text-pg"
                onClick={onClose}
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon
                  className="inline mb-1 mr-1 h-7 w-7"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="text-center relative mt-3 flex-1 px-4 sm:px-6">
              {/* Your content */}
              <form onSubmit={onSubmit}>
                <label className="block mb-3">
                  <p>Escribe tu nuevo TO-DO</p>
                </label>
                <textarea
                  className="bg-rs border-2 border-ic py-2 px-5 rounded-md placeholder:italic placeholder:font-semibold placeholder:text-sc"
                  placeholder="Cortar cebolla para el almuerzo"
                  value={newTodoValue}
                  onChange={onChange}
                />
                <div className="text-center justify-end">
                  <button
                    className="mr-2 border-ic border-2 hover:bg-at font-semibold text-sc mt-5 px-3 py-1 rounded-lg"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button className="border-ic border-2 hover:bg-at font-semibold text-sc mt-5 px-3 py-1 rounded-lg">
                    Añadir
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
