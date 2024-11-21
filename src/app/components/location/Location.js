import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Map from "../map/Map";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export default function Location(props) {
  const [jobType, setJobType] = useState("LEAK DETECTION");
  const [data, setdata] = useState([]);

  useEffect(() => {});
  // console.log('props.route.params.viewData : ', props.route.params.viewData);

  return (
    <View style={{ height: viewportHeight }}>
      {/* <Map mapdata={props.data} jobtype={props.jobtype} /> */}
      <Map
        mapdata={data}
        jobtype={jobType}
        data={props.route.params.viewData}
        ww_code={props.route.params.ww_code}
      />
    </View>
  );
}
