// React
import React, { useCallback, useEffect, useState } from "react";
// Media
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import type { EmblaCarouselType } from "embla-carousel";

type propsType = {
  emblaApi?: EmblaCarouselType | null;
}

export const usePrevNextButtons = (props: propsType) => {
  const { emblaApi } = props
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      <FaLongArrowAltLeft className="text-primaryGreen text-2xl cursor-pointer transition-all hover:text-3xl" />
    </button>
  );
};

export const NextButton = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      <FaLongArrowAltRight className="text-primaryGreen text-2xl cursor-pointer transition-all hover:text-3xl" />
    </button>
  );
};
