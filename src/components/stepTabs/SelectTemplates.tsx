import Image from "next/image";
// ===============
import { CTA } from "@/components";
import { BiDuplicate, BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useState } from "react";


type SelectTemplatesProps = {
    onTemplateSelect?: () => void;
    templates: any[];
    isContainer?: boolean
};

const hoverActions = [
    { icon: <BiSolidEdit className="text-2xl" />, label: "Edit" },
    { icon: <MdDeleteOutline className="text-2xl" />, label: "Delete" },
    { icon: <FaWandMagicSparkles className="text-2xl" />, label: "Tailor for a job" },
];


const SelectTemplates = (props: SelectTemplatesProps) => {
    const { onTemplateSelect, templates, isContainer } = props

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');

    return (
        <section className="my-5 md:my-10">
            <div className={isContainer === false ? "" : "container"}>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isContainer === false ? 'gap-3' : 'gap-5'}`}>
                    {templates.map((template: any, index: any) => (
                        <div key={index} className={`flex flex-col p-3 cursor-pointer transition-all duration-700 ${template.date ? 'bg-white border-gray-200 shadow-md flex flex-col items-center border gap-2 rounded-md' : 'bg-indigo-200/20 backdrop-blur-none border-2 border-hamzaPrimary group gap-5  rounded-lg'}`}>
                            {!template.date && <div className="flex items-center justify-center">
                                <p className="text-[16px] lg:text-[18px] font-medium text-zinc-800">
                                    {template.name}
                                </p>
                            </div>}

                            {template.date && <div className="flex items-center justify-center gap-2">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        onBlur={() => setEditingIndex(null)} // Optional: exit edit mode on blur
                                        className="border border-gray-300 rounded px-2 py-1 text-sm text-black"
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        <p className="text-[16px] lg:text-[18px] font-medium text-zinc-800">
                                            {template.name}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setEditingIndex(index);
                                                setEditedName(template.name);
                                            }}
                                            className="text-primarySlate/80 hover:text-black"
                                        >
                                            <BiSolidEdit className="text-lg ml-1" />
                                        </button>
                                    </>
                                )}
                            </div>}

                            {template.date && <div className="text-sm text-primarySlate/80 font-medium">{template.date}</div>}

                            <div className={`relative ring-2 ring-zinc-500/20 rounded-lg overflow-hidden ${template.date ? 'group shadow-md' : 'shadow-lg'}`}>
                                {/*======= Template Image =======*/}
                                <Image
                                    src={template.image}
                                    alt={`Template ${index + 1}`}
                                    width={300}
                                    height={400}
                                    className="w-full lg:w-auto h-auto"
                                />

                                {/*======= Overlay CTA =======*/}
                                {!template.date && <div className="flex items-center justify-center w-full h-full bg-slate-800/90 absolute top-0 left-0 z-20 opacity-0 transition-all duration-700 group-hover:opacity-100">
                                    <div className="translate-y-56  transition-all duration-700 group-hover:-translate-y-0">
                                        <CTA
                                            btn
                                            text="Use This Template"
                                            bgColor="bg-PrimaryDark hover:bg-transparent"
                                            txtColor="text-white"
                                            border="border border-white"
                                            handleClick={onTemplateSelect}
                                        />
                                    </div>
                                </div>}

                                {template.date && (
                                    <div className="absolute inset-0 bg-slate-800/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-10">
                                        <div className="flex gap-2">
                                            {hoverActions.map((action, idx) => (
                                                <div
                                                    key={idx}
                                                    className="overflow-x-visible relative w-8 h-[3.3rem] overflow-y-clip group/icon text-center"
                                                >
                                                    <div
                                                        className="flex justify-center items-center w-8 h-8 p-[4px] rounded-full bg-white/20 border border-white/30 transition-all duration-300 absolute top-0 group-hover/icon:scale-[.80] group-hover/icon:origin-top text-white"
                                                    >
                                                        {action.icon}
                                                    </div>
                                                    <div
                                                        className="absolute text-white font-medium -bottom-10 left-1/2 text-xs text-center whitespace-nowrap transition-all duration-300 transform -translate-x-1/2 group-hover/icon:bottom-0"
                                                    >
                                                        {action.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}


                            </div>

                            {/* ======== Template Icons ======= */}
                            {template.date && <div className="flex gap-3 mt-2">
                                <button className="text-sm text-primarySlate/80 hover:text-black flex items-center duration-200">
                                    Duplicate <BiDuplicate className='w-4 h-4 ml-1' />
                                </button>
                                <div className='h-6 w-[1.1px] bg-primaryGray/50'>
                                </div>
                                <button className="text-sm text-primarySlate/80 hover:text-black flex items-center duration-200">
                                    Download <MdOutlineFileDownload className='w-5 h-5 ml-1' />
                                </button>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectTemplates;
