import { YourDetails, YourScore } from "@/components";

const AtsScore = () => {

  return (
    <>
      <section className="py-5 md:py-10 mt-5">
        <div className="container">
          <div className="flex flex-col xl:flex-row gap-6">
            <YourScore />
            <YourDetails />
          </div>
        </div>
      </section>
    </>
  );
};

export default AtsScore;
