"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { reorderSections } from "@/redux/slices/addSectionSlice";
import { Lock } from "lucide-react";
import Image from "next/image";
import Add from "media/builderIcons/add.svg";
import { CgClose } from "react-icons/cg";
import LoadingSkeleton from "@/components/loadingSkeleton/loadingSkeleton";

type propsType = {
  doubleColumn?: boolean | string;
};

const DndExample = ({ doubleColumn }: propsType) => {
  const dispatch = useDispatch();
  const addedSections = useSelector(
    (state: any) => state.addSection.addedSections
  );

  // new selected section work start
  // const rightNames = ["Contact", "Technical Skill", "Soft Skill", "Languages"];
  // const leftSections = addedSections.filter(
  //   (item: any) => !rightNames.includes(item.name)
  // );
  // const rightSections = addedSections.filter(
  //   (item: any) => rightNames.includes(item.name)
  // );
  // // Split only for rendering purposes

  // const cards = [
  //   { id: "left", components: leftSections },
  //   { id: "right", components: rightSections },
  // ];

  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const rightNames = ["Contact", "Technical Skill", "Soft Skill", "Languages"];

  //   const leftSections = addedSections.filter(
  //     (item: any) => !rightNames.includes(item.name)
  //   );
  //   const rightSections = addedSections.filter(
  //     (item: any) => rightNames.includes(item.name)
  //   );

  //   const sourceList = source.droppableId === "left" ? leftSections : rightSections;
  //   const destList = destination.droppableId === "left" ? leftSections : rightSections;

  //   const movedItem = sourceList[source.index];

  //   // Prevent dragging locked items
  //   if (movedItem.locked) return;

  //   // Prevent dropping at index 0 if locked
  //   if (destination.index === 0 && destList[0]?.locked) return;

  //   // Remove from source
  //   const updatedSource = [...sourceList];
  //   updatedSource.splice(source.index, 1);

  //   // Add to destination
  //   const updatedDest = [...destList];
  //   updatedDest.splice(destination.index, 0, movedItem);

  //   // Merge back to full list
  //   const finalSections: any =
  //     destination.droppableId === "left"
  //       ? [...updatedDest, ...rightSections.filter((s: any) => s.id !== movedItem.id)]
  //       : [...leftSections.filter((s: any) => s.id !== movedItem.id), ...updatedDest];

  //   dispatch(reorderSections(finalSections));
  // };
  // new selected section work end

  // old middle work start
  const mid = Math.ceil(addedSections.length / 2);
  const cards = [
    { id: "left", components: addedSections.slice(0, mid) },
    { id: "right", components: addedSections.slice(mid) },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Flattened source index in addedSections
    const startIdx =
      source.droppableId === "left" ? 0 : mid;
    const endIdx =
      destination.droppableId === "left" ? 0 : mid;

    const reordered: any = Array.from(addedSections);
    const [movedItem]: any = reordered.splice(startIdx + source.index, 1);

    // Prevent dragging locked items
    if (movedItem.locked) return;

    // Prevent dropping into index 0 if locked
    if (
      destination.index === 0 &&
      addedSections[endIdx]?.locked
    )
      return;

    reordered.splice(endIdx + destination.index, 0, movedItem);
    dispatch(reorderSections(reordered));
  };
  // old middle work end



  if (!addedSections.length) return <LoadingSkeleton />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`grid ${doubleColumn
          ? "grid-cols-2 gap-4"
          : "grid-cols-1"
          }`}
      >
        {cards.map((col) => (
          <Droppable
            key={col.id}
            droppableId={col.id}
            type="ITEM"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {col.components.map((component: any, index: any) => (
                  <Draggable
                    key={component.id.toString()}
                    draggableId={component.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...(!component.locked
                          ? {
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                          }
                          : {})}
                        className={`bg-gray-200 border rounded-lg p-3 my-2 text-center text-[14px] flex items-center justify-between ${component.locked
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-[#9885FF] hover:text-white"
                          }`}
                      >
                        {component.locked ? (
                          <Lock size={18} className="text-slate-800" />
                        ) : (
                          <Image
                            src={Add}
                            alt="Add"
                            width={16}
                          />
                        )}
                        {component.name}
                        {!component.locked && <CgClose />}
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
