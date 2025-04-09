"use client";

import { useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import LoadingSkeleton from "@/components/loadingSkeleton/loadingSkeleton";
import { cardsData } from "./CardsData";

const STORAGE_KEY = "dragAndDropData";

type propsType = {
  doubleColumn?: boolean | string
}

const DndExample = (props: propsType) => {
  const { doubleColumn } = props
  const [data, setData] = useState(cardsData);

  // useEffect(() => {
  //   const savedData = localStorage.getItem(STORAGE_KEY);
  //   if (savedData) {
  //     setData(JSON.parse(savedData));
  //   }
  // }, []);

  // const saveToLocalStorage = (updatedData: any) => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  // };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    let newData = [...data];
    const sourceColIndex = newData.findIndex(col => col.id.toString() === source.droppableId);
    const destColIndex = newData.findIndex(col => col.id.toString() === destination.droppableId);

    if (sourceColIndex === -1 || destColIndex === -1) return;

    const sourceComponents = newData[sourceColIndex].components;
    const destComponents = newData[destColIndex].components;

    // Get the item being moved
    const [movedItem] = sourceComponents.splice(source.index, 1);

    // 1. Prevent moving a locked item from its position
    if (movedItem.locked) {
      sourceComponents.splice(source.index, 0, movedItem); // Put it back
      return;
    }

    // 2. Prevent dropping any item at index 0 if it's locked (like "Summary")
    if (destination.index === 0 && destComponents[0]?.locked) {
      sourceComponents.splice(source.index, 0, movedItem); // Put it back
      return;
    }

    // Move the item
    destComponents.splice(destination.index, 0, movedItem);
    setData(newData);
  };



  if (!data.length) return <LoadingSkeleton />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`grid  ${doubleColumn ? 'grid-cols-2 gap-4 transition-all duration-300' : 'grid-cols-1 transition-all duration-300 p-4 bg-gray-100 rounded-lg'}`}>
        {data.map((col) => (
          <Droppable key={col.id} droppableId={col.id.toString()} type="ITEM">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={doubleColumn ? "p-4 bg-gray-100 rounded-lg" : ""}>
                {col.components.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        className={`bg-gray-200 border rounded-lg p-3 my-2 text-center cursor-pointer hover:bg-gray-300 ${component.height} ${component.locked && index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        {...(component.locked && index === 0 ? {} : { ...provided.dragHandleProps, ...provided.draggableProps })}
                        ref={provided.innerRef}
                      >
                        {component.name}
                        {(component.locked && index === 0) && <IoIosLock size={18} className="inline ml-2 text-slate-800" />}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default DndExample;
