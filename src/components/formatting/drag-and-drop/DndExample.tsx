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
import { RootState } from "@/redux/store";

type PropsType = {
  doubleColumn?: boolean | string;
};

const DndExample = ({ doubleColumn }: PropsType) => {
  const dispatch = useDispatch();
  const addedSections = useSelector(
    (state: any) => state.addSection.addedSections
  );
  const rightSideSections = useSelector(
    (state: RootState) => state.rearrange.list
  );

  if (!addedSections.length) return <LoadingSkeleton />;

  const leftSections = addedSections.filter(
    (section: any) => !rightSideSections.includes(section.name)
  );
  const rightSections = addedSections.filter((section: any) =>
    rightSideSections.includes(section.name)
  );

  const getColumnComponents = (sectionList: any[]) => {
    const locked = sectionList.filter((section) => section.locked);
    const unlocked = sectionList.filter((section) => !section.locked);
    return { locked, unlocked };
  };

  const cards = [
    { id: "left", ...getColumnComponents(leftSections) },
    { id: "right", ...getColumnComponents(rightSections) },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol !== destCol) return;

    const sourceList = sourceCol === "left" ? leftSections : rightSections;
    const otherList = sourceCol === "left" ? rightSections : leftSections;

    const { locked, unlocked } = getColumnComponents(sourceList);

    const reorderedUnlocked = [...unlocked];
    const [movedItem] = reorderedUnlocked.splice(source.index, 1);
    reorderedUnlocked.splice(destination.index, 0, movedItem);

    // Merge locked and unlocked sections keeping locked items in their original positions
    const merged = [...sourceList];
    let unlockedIndex = 0;

    for (let i = 0; i < merged.length; i++) {
      if (!merged[i].locked) {
        merged[i] = reorderedUnlocked[unlockedIndex++];
      }
    }

    const newOrder: any =
      sourceCol === "left" ? [...merged, ...otherList] : [...otherList, ...merged];

    dispatch(reorderSections(newOrder));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`grid ${doubleColumn ? "grid-cols-2 gap-4" : "grid-cols-1"
          }`}
      >
        {cards.map((col) => (
          <Droppable key={col.id} droppableId={col.id} type="ITEM">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {/* Render locked items (not draggable) */}
                {col.locked.map((component: any) => (
                  <div
                    key={component.id}
                    className="bg-gray-200 border rounded-lg p-3 my-2 text-center text-[14px] flex items-center justify-between opacity-50 cursor-not-allowed"
                  >
                    <Lock size={18} className="text-slate-800" />
                    {component.name}
                    <div></div>
                  </div>
                ))}

                {/* Render unlocked items (draggable) */}
                {col.unlocked.map((component: any, index: number) => (
                  <Draggable
                    key={component.id.toString()}
                    draggableId={component.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-200 border rounded-lg p-3 my-2 text-center text-[14px] flex items-center justify-between cursor-pointer hover:bg-[#9885FF] hover:text-white"
                      >
                        <Image src={Add} alt="Add" width={16} />
                        {component.name}
                        <CgClose />
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
