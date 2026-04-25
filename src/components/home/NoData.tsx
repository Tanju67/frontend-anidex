import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";

function NoData({ title }: { title: string }) {
  return (
    <SectionSlider title={title} skeleton={true} data={[]}>
      <div className="opacity-60">No data found</div>
    </SectionSlider>
  );
}

export default NoData;
