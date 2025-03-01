import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Map from "../map/Map";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export default function Location(props) {
  // console.log("location.js: ", props.route.params)
  const [jobType, setJobType] = useState("LEAK DETECTION");
  const [data, setdata] = useState([]);

  useEffect(() => {});

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
