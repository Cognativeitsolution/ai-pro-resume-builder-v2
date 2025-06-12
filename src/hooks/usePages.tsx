
import { useEffect } from "react";
import { Previewer } from "pagedjs" ;

export const usePaged = (selector: string = "#resume-content") => {
  useEffect(() => {
    const paged = new Previewer();
    paged.preview(document.querySelector(selector) as HTMLElement, [], document.body)
      .then(flow => {
        console.log("Paged.js finished. Total pages:", flow.total);
      })
      .catch(err => {
        console.error("Paged.js error:", err);
      });
  }, [selector]);
};