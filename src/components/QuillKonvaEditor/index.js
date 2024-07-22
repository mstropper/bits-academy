import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Stage, Layer, Circle, Star, Text } from 'react-konva';
import { useDrop } from 'react-dnd';
import 'react-quill/dist/quill.snow.css';
import Menu from '../Menu';

const QuillKonvaEditor = () => {
  const [quillContent, setQuillContent] = useState('');
  const [elements, setElements] = useState([]);
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const documentRef = useRef(null);

  const handleQuillChange = (content, delta, source, editor) => {
    setQuillContent(content);
    updateKonvaText(editor.getText());
  };

  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (documentRef.current) {
        const documentRect = documentRef.current.getBoundingClientRect();
        const x = offset.x - documentRect.left;
        const y = offset.y - documentRect.top;
        addElement(item.type, x, y);
      }
    },
  }));

  const addElement = (type, x, y) => {
    const id = new Date().getTime();
    if (type === 'circle') {
      setElements((prevElements) => [
        ...prevElements,
        { id, type, x, y, radius: 50, fill: 'red' },
      ]);
    } else if (type === 'star') {
      setElements((prevElements) => [
        ...prevElements,
        { id, type, x, y, numPoints: 5, innerRadius: 20, outerRadius: 40, fill: 'yellow' },
      ]);
    }
  };

  const updateKonvaText = (newText) => {
    if (textRef.current) {
      textRef.current.text(newText);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Menu style={{ width: '100%', height: '100px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '10px' }}>
        <h2>Editor</h2>
        <ReactQuill
          style={{ borderRadius: '4px', flex: 1 }}
          value={quillContent}
          onChange={handleQuillChange}
          modules={QuillKonvaEditor.modules}
          formats={QuillKonvaEditor.formats}
        />
        <h2 style={{ marginTop: '50px' }}>Documento</h2>
        <div ref={drop} style={{ border: '1px solid #d1d1d1', flex: 1, position: 'relative' }}>
          <div ref={documentRef} style={{ position: 'relative', height: '500px', width: '100%' }}>
            <Stage width={window.innerWidth} height={500} ref={stageRef}>
              <Layer>
                <Text
                  ref={textRef}
                  x={50}
                  y={50}
                  text={quillContent.replace(/<\/?[^>]+(>|$)/g, "")}
                  fontSize={20}
                  fill="black"
                />
                {elements.map((element) => {
                  if (element.type === 'circle') {
                    return (
                      <Circle
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        radius={element.radius}
                        fill={element.fill}
                        draggable
                        onDragEnd={(e) => {
                          const updatedElements = elements.map((el) =>
                            el.id === element.id
                              ? { ...el, x: e.target.x(), y: e.target.y() }
                              : el
                          );
                          setElements(updatedElements);
                        }}
                      />
                    );
                  } else if (element.type === 'star') {
                    return (
                      <Star
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        numPoints={element.numPoints}
                        innerRadius={element.innerRadius}
                        outerRadius={element.outerRadius}
                        fill={element.fill}
                        draggable
                        onDragEnd={(e) => {
                          const updatedElements = elements.map((el) =>
                            el.id === element.id
                              ? { ...el, x: e.target.x(), y: e.target.y() }
                              : el
                          );
                          setElements(updatedElements);
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

QuillKonvaEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

QuillKonvaEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

export default QuillKonvaEditor;
