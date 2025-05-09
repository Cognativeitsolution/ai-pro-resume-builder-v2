import { useDispatch } from "react-redux";
import { setSelectedTemplate } from "@/redux/slices/template";

function TemplateSwitch() {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4">
            <button onClick={() => dispatch(setSelectedTemplate("template1"))}>Template 1</button>
            <button onClick={() => dispatch(setSelectedTemplate("template2"))}>Template 2</button>
            <button onClick={() => dispatch(setSelectedTemplate("template3"))}>Template 3</button>
            <button onClick={() => dispatch(setSelectedTemplate("template10"))}>Template 10</button>
        </div>
    );
}

export default TemplateSwitch