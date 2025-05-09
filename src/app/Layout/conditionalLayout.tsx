"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { NewFooter, NewHeader } from "@/components";

const ConditionalLayout = ({ children }: any) => {
  const pathname = usePathname();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   OldAPI.get("settings-for-website").then((res) => {
  //     console.log(res, "res");
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <>
      {pathname === "/create-resume/formatting" || pathname === "/formatting-new" ? null : <NewHeader />}
      {/* {loading ? <SpinnerLoader /> : children} */}
      {children}
      <NewFooter />
    </>
  );
};

export default ConditionalLayout;
