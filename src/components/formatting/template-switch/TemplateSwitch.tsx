import { useDispatch } from "react-redux";
import { setSelectedTemplate } from "@/redux/slices/template";
import Image from "next/image";

// Import all 31 template images
import TemplateImage1 from 'media/assets/resume_template_images/template_1.webp';
import TemplateImage2 from 'media/assets/resume_template_images/template_2.webp';
import TemplateImage3 from 'media/assets/resume_template_images/template_3.webp';
import TemplateImage4 from 'media/assets/resume_template_images/template_4.webp';
import TemplateImage5 from 'media/assets/resume_template_images/template_5.webp';
import TemplateImage6 from 'media/assets/resume_template_images/template_6.webp';
import TemplateImage7 from 'media/assets/resume_template_images/template_7.webp';
import TemplateImage8 from 'media/assets/resume_template_images/template_8.webp';
import TemplateImage9 from 'media/assets/resume_template_images/template_9.webp';
import TemplateImage10 from 'media/assets/resume_template_images/template_10.webp';
import TemplateImage11 from 'media/assets/resume_template_images/template_11.webp';
import TemplateImage12 from 'media/assets/resume_template_images/template_12.webp';
import TemplateImage13 from 'media/assets/resume_template_images/template_13.webp';
import TemplateImage14 from 'media/assets/resume_template_images/template_14.webp';
import TemplateImage15 from 'media/assets/resume_template_images/template_15.webp';
import TemplateImage16 from 'media/assets/resume_template_images/template_16.webp';
import TemplateImage17 from 'media/assets/resume_template_images/template_17.webp';
import TemplateImage18 from 'media/assets/resume_template_images/template_18.webp';
import TemplateImage19 from 'media/assets/resume_template_images/template_19.webp';
import TemplateImage20 from 'media/assets/resume_template_images/template_20.webp';
import TemplateImage21 from 'media/assets/resume_template_images/template_21.webp';
import TemplateImage22 from 'media/assets/resume_template_images/template_22.webp';
import TemplateImage23 from 'media/assets/resume_template_images/template_23.webp';
import TemplateImage24 from 'media/assets/resume_template_images/template_24.webp';
import TemplateImage25 from 'media/assets/resume_template_images/template_25.webp';
import TemplateImage26 from 'media/assets/resume_template_images/template_26.webp';
import TemplateImage27 from 'media/assets/resume_template_images/template_27.webp';
import TemplateImage28 from 'media/assets/resume_template_images/template_28.webp';
import TemplateImage29 from 'media/assets/resume_template_images/template_29.webp';
import TemplateImage30 from 'media/assets/resume_template_images/template_30.webp';

// Template metadata array
const templateData = [
    { id: 'template1', name: 'Template 1', image: TemplateImage1 },
    { id: 'template2', name: 'Template 2', image: TemplateImage2 },
    { id: 'template3', name: 'Template 3', image: TemplateImage3 },
    // { id: 'template4', name: 'Template 4', image: TemplateImage4 },
    // { id: 'template5', name: 'Template 5', image: TemplateImage5 },
    // { id: 'template6', name: 'Template 6', image: TemplateImage6 },
    // { id: 'template7', name: 'Template 7', image: TemplateImage7 },
    // { id: 'template8', name: 'Template 8', image: TemplateImage8 },
    // { id: 'template9', name: 'Template 9', image: TemplateImage9 },
    { id: 'template10', name: 'Template 10', image: TemplateImage10 },
    // { id: 'template11', name: 'Template 11', image: TemplateImage11 },
    // { id: 'template12', name: 'Template 12', image: TemplateImage12 },
    // { id: 'template13', name: 'Template 13', image: TemplateImage13 },
    // { id: 'template14', name: 'Template 14', image: TemplateImage14 },
    // { id: 'template15', name: 'Template 15', image: TemplateImage15 },
    // { id: 'template16', name: 'Template 16', image: TemplateImage16 },
    // { id: 'template17', name: 'Template 17', image: TemplateImage17 },
    // { id: 'template18', name: 'Template 18', image: TemplateImage18 },
    // { id: 'template19', name: 'Template 19', image: TemplateImage19 },
    // { id: 'template20', name: 'Template 20', image: TemplateImage20 },
    // { id: 'template21', name: 'Template 21', image: TemplateImage21 },
    // { id: 'template22', name: 'Template 22', image: TemplateImage22 },
    // { id: 'template23', name: 'Template 23', image: TemplateImage23 },
    // { id: 'template24', name: 'Template 24', image: TemplateImage24 },
    // { id: 'template25', name: 'Template 25', image: TemplateImage25 },
    // { id: 'template26', name: 'Template 26', image: TemplateImage26 },
    // { id: 'template27', name: 'Template 27', image: TemplateImage27 },
    // { id: 'template28', name: 'Template 28', image: TemplateImage28 },
    // { id: 'template29', name: 'Template 29', image: TemplateImage29 },
    // { id: 'template30', name: 'Template 30', image: TemplateImage30 },
];

function TemplateSwitch() {
    const dispatch = useDispatch();

    return (
        <div className="h-[600px] overflow-y-auto mt-4 pt-2">
            <div className="grid grid-cols-2 gap-3 pr-2">
                {templateData.map((template) => (
                    <div
                        key={template.id}
                        className="relative border border-indigo-400 rounded-sm shadow-md cursor-pointer group hover:bg-indigo-100 transition"
                    >
                        <Image src={template.image} alt={template.name} className="w-full" />

                        <div className="w-full py-[6px] flex justify-center items-center text-sm bg-indigo-400 text-white">
                            {template.name}
                        </div>

                        {/* Hover Button */}
                        <button
                            onClick={() => dispatch(setSelectedTemplate(template.id))}
                            className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                        >
                            Use This Template
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplateSwitch;
