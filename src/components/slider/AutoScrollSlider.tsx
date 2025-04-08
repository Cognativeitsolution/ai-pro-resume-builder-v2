"use client";
// Embla
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type propsType = {
  wrapperClasses?: string;
  direction?: any;
  children?: React.ReactNode;
}

export default function AutoScrollSlider(props: propsType) {
  const {
    wrapperClasses = " ",
    direction = "forward",
    children,
  } = props
  const plugins = [
    AutoScroll({
      playOnInit: true,
      speed: 0.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
      direction,
    }),
  ];
  const [emblaRef] = useEmblaCarousel(
    { align: "center", dragFree: true, loop: true },
    plugins
  );
  return (
    <div className={`overflow-hidden ${wrapperClasses}`} ref={emblaRef}>
      <div className="flex [margin-left:calc(1rem_*_-1)] items-center">
        {children}
      </div>
    </div>
  );
}
