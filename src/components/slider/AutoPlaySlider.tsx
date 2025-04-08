"use client";
// Embla
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
// Components
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/components/slider/SliderArrows";

type propsType = {
  wrapperClasses?: string;
  options?: EmblaOptionsType; // Type for Embla carousel options
  children?: React.ReactNode; // Type for React children
  arrows?: boolean;
  arrowPosition?: string;
}

export default function AutoPlaySlider(props: propsType) {
  const {
    wrapperClasses = " ",
    options,
    children,
    arrows = true,
    arrowPosition = "",
  } = props

  const plugins = [
    Autoplay({ delay: 5000, stopOnFocusIn: false, stopOnInteraction: false }),
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { dragFree: true, loop: true, ...options },
    plugins // Ensure `plugins` has a valid type
  )

  const buttonHandlers = usePrevNextButtons({ emblaApi: emblaApi ?? null });

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi as any);

  return (
    <>
      <div className={`overflow-hidden ${wrapperClasses}`} ref={emblaRef}>
        <div className="flex [margin-left:calc(1.25rem_*_-1)]">{children}</div>
      </div>
      {arrows && (
        <div className={`flex gap-10 justify-center mt-10 ${arrowPosition}`}>
          <PrevButton onClick={buttonHandlers.onPrevButtonClick} disabled={buttonHandlers.prevBtnDisabled} />
          <NextButton onClick={buttonHandlers.onNextButtonClick} disabled={buttonHandlers.nextBtnDisabled} />
        </div>
      )}
    </>
  );
}
