import React from 'react';
import QuillKonvaEditor from './components/QuillKonvaEditor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <QuillKonvaEditor />
      </div>
    </DndProvider>
  );
};

export default App;
