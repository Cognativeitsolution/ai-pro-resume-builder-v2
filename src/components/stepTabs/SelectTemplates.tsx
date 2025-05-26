import Image from "next/image";
// ===============
import { CTA } from "@/components";
// ===============
import template1 from 'media/images/resume-templates/Sleek Simplicity 1.webp'
import template2 from 'media/images/resume-templates/Professional Polished 2.webp'
import template3 from 'media/images/resume-templates/Elegant Executive 3.webp'
import template4 from 'media/images/resume-templates/Creative Infusion 4.webp'
import template5 from 'media/images/resume-templates/Classic Professional 5.webp'
import template6 from 'media/images/resume-templates/Career Catalyst 6.webp'
import template7 from 'media/images/resume-templates/Innovative Edge 7.webp'
import template8 from 'media/images/resume-templates/Dynamic Designer 8.webp'
import template9 from 'media/images/resume-templates/Bold Statement 9.webp'
import template10 from 'media/images/resume-templates/Fresher Resume 10.webp'
import template11 from 'media/images/resume-templates/Bright Future 11.webp'
import template12 from 'media/images/resume-templates/Stylish Standard 12.webp'
import template13 from 'media/images/resume-templates/Artistic Flair 13.webp'
import template14 from 'media/images/resume-templates/Graphical Genius 14.webp'
import template15 from 'media/images/resume-templates/Chic and Simple 15.webp'
import template16 from 'media/images/resume-templates/Executive Envision 16.webp'
import template17 from 'media/images/resume-templates/Chromatic Currere 17.webp'
import template18 from 'media/images/resume-templates/Synergistic Synapse 18.webp'
import template19 from 'media/images/resume-templates/Paradigm Pivot 19.webp'
import template20 from 'media/images/resume-templates/Transcendent Trajectory 20.webp'

//===== Template data
const templates = [
    { name: "Sleek Simplicity", image: template1 },
    { name: "Professional Polished", image: template2 },
    { name: "Elegant Executive", image: template3 },
    { name: "Creative Infusion", image: template4 },
    { name: "Classic Professional", image: template5 },
    { name: "Career Catalyst", image: template6 },
    { name: "Innovative Edge", image: template7 },
    { name: "Dynamic Designer", image: template8 },
    { name: "Bold Statement", image: template9 },
    { name: "Fresher Resume", image: template10 },
    { name: "Bright Future", image: template11 },
    { name: "Stylish Standard", image: template12 },
    { name: "Artistic Flair", image: template13 },
    { name: "Graphical Genius", image: template14 },
    { name: "Chic and Simple", image: template15 },
    { name: "Executive Envision", image: template16 },
    { name: "Chromatic Currere", image: template17 },
    { name: "Synergistic Synapse", image: template18 },
    { name: "Paradigm Pivot", image: template19 },
    { name: "Transcendent Trajectory", image: template20 },
];

type SelectTemplatesProps = {
    onTemplateSelect?: () => void;
};

const SelectTemplates: React.FC<SelectTemplatesProps> = ({ onTemplateSelect }) => {
    return (
        <section className="my-5 md:my-10">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {templates.map((template, index) => (
                        <div key={index} className="flex flex-col gap-5 p-3 rounded-lg bg-indigo-200/20 backdrop-blur-none border-2 border-hamzaPrimary cursor-pointer transition-all duration-700 group">
                            <div className="flex items-center justify-center">
                                <p className="text-[16px] lg:text-[18px] font-medium text-zinc-800">
                                    {template.name}
                                </p>
                            </div>

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
