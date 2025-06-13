import Image from "next/image";
// ===============
import { CTA } from "@/components";


type SelectTemplatesProps = {
    onTemplateSelect?: () => void;
    templates: any[];
    isContainer?: boolean
};

const SelectTemplates = (props: SelectTemplatesProps) => {
    const { onTemplateSelect, templates, isContainer } = props

    return (
        <section className="my-5 md:my-10">
            <div className={isContainer === false ? "" : "container"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {templates.map((template: any, index: any) => (
                        <div key={index} className="flex flex-col gap-5 p-3 rounded-lg bg-indigo-200/20 backdrop-blur-none border-2 border-hamzaPrimary cursor-pointer transition-all duration-700 group">
                            <div className="flex items-center justify-center">
                                <p className="text-[16px] lg:text-[18px] font-medium text-zinc-800">
                                    {template.name}
                                </p>
                            </div>
                            {template.date && <div className="text-xs text-gray-400 mb-2">{template.date}</div>}

                            <div className="ring-2 ring-zinc-500/20 rounded-lg shadow-lg overflow-hidden relative">
                                {/*======= Template Image =======*/}
                                <Image
                                    src={template.image}
                                    alt={`Template ${index + 1}`}
                                    width={300}
                                    height={400}
                                    className="w-full lg:w-auto h-auto"
                                />

                                {/*======= Overlay CTA =======*/}
                                <div className="flex items-center justify-center w-full h-full bg-slate-800/90 absolute top-0 left-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                    <div className="translate-y-56 group-hover:-translate-y-0 transition-all duration-700">
                                        <CTA
                                            btn
                                            text="Use This Template"
                                            bgColor="bg-PrimaryDark hover:bg-transparent"
                                            txtColor="text-white"
                                            border="border border-white"
                                            handleClick={onTemplateSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectTemplates;
