import ReportDetails from "./ReportDetails";

export default function ReportSections(props) {
  if (!props.sectionData) {
    return null;
  }
  var objDetail = [];
  for (var i = 0; i < props.sectionData.details.length; i++) {
    ///envio a report detail
    objDetail.push(
      <ReportDetails
        position={i}
        detail={props.sectionData.details[i]}
        onChangeValues={props.onChangeValues}
        value={props.values[props.sectionData.details[i].code]}
      />
    );
  }

  return (
    <div className="lis-cont">
      <div className="title-co">{props.sectionData.name}</div>
      {objDetail}
    </div>
  );
}
