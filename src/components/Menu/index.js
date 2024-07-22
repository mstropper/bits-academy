import React from 'react';
import { useDrag } from 'react-dnd';

const Menu = () => {
  const [{ isDraggingCircle }, dragCircle] = useDrag(() => ({
    type: 'element',
    item: { type: 'circle' },
    collect: (monitor) => ({
      isDraggingCircle: !!monitor.isDragging(),
    }),
  }));

  const [{ isDraggingStar }, dragStar] = useDrag(() => ({
    type: 'element',
    item: { type: 'star' },
    collect: (monitor) => ({
      isDraggingStar: !!monitor.isDragging(),
    }),
  }));

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px', width: '100%', borderBottom: '1px solid #d1d1d1' }}>
      <div
        ref={dragCircle}
        style={{
          opacity: isDraggingCircle ? 0.5 : 1,
          width: '60px',
          height: '60px',
          borderRadius: '4px',
          padding: '10px',
          margin: '10px',
          backgroundColor: 'red',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        Circle
      </div>
      <div
        ref={dragStar}
        style={{
          opacity: isDraggingStar ? 0.5 : 1,
          width: '60px',
          height: '60px',
          borderRadius: '4px',
          padding: '10px',
          margin: '10px',
          backgroundColor: 'yellow',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        Star
      </div>
    </div>
  );
};

export default Menu;
