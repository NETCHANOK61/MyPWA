import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Dimensions, Text, StyleSheet, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import WorkRepairDetailScreen from "./WorkRepairDetailScreen";
import WorkCarryRepairScreen from "./WorkCarryRepairScreen";
import WorkSurveyScreen from "./WorkSurveyScreen";
import BottomTab from "../../components/bottom/BottomTab";
import { timeNow, dateNowTh } from "../../utils/Date";
import * as workCarryRepairAction from "../../actions/jobsurvey/WorkCarryRepairAction";
import * as WorkRepairDetailAction from "../../actions/workrepair/WorkRepairDetailAction";

export default function MainTabScreen({ props, navigation }) {
  const dispatch = useDispatch();
  const workCarrayRepairReducer = useSelector(
    (state) => state.workCarrayRepairReducer
  );
  const workRepairDetailReducer = useSelector(
    (state) => state.workRepairDetailReducer
  );

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);

  const init = () => {
    let brokenAppearanceText = "";
    if (workRepairDetailReducer.dataArray.process != null) {
      brokenAppearanceText =
        workRepairDetailReducer.dataArray.process.brokenAppearance;
    }
    dispatch(workCarryRepairAction.loadPiker(brokenAppearanceText));
    reMemViewWorkCarryRepair();
    return () => {};
  };
  useEffect(() => {
    init();
  }, []);

  const reMemViewWorkCarryRepair = () => {
    if (workRepairDetailReducer.dataArray.process != null) {
      if (workRepairDetailReducer.dataArray.survey.pipe_id == "") {
        if (workRepairDetailReducer.dataArray.process.isNotGIS != null) {
          dispatch(WorkRepairDetailAction.setStateRadioPipe("2"));
        }
      } else {
        dispatch(WorkRepairDetailAction.setStateRadioPipe("1"));
      }
    } else {
      dispatch(WorkRepairDetailAction.setStateRadioPipe("0"));
    }
    const obj = {
      sts: "1",
      dateForm: dateNowTh(),
      dateTo: dateNowTh(),
      dateTextTure: dateNowTh(),
      timeFrom: timeNow(),
      timeTo: timeNow(),
      timeTextTrue: timeNow(),
    };
    dispatch(workCarryRepairAction.rememViewWorkCarryRepair(obj));
  };

  const [routes] = React.useState([
    { key: "workrepairdetail", title: "รายละเอียดงาน" },
    { key: "worksurvey", title: "จุดซ่อมเเละ\nภาพงานซ่อม" },
    { key: "workCarryRepair", title: "ดำเนินการซ่อม" },
  ]);

  const empoyees = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject.dataEmployees) {
        let obj = {
          label: `${iterator.fNameTH} ${iterator.lNameTH}`,
          value: iterator.empId,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const getLeakwounds = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject.getLeakWounds
        .data) {
        let obj = {
          label: iterator.text,
          value: iterator.value,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const getSerfaces = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject.getSerfaces
        .surfaces) {
        let obj = {
          label: iterator.text,
          value: iterator.value,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const getTypeOfPipes = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject.getTypeOfPipes
        .typeOfPipes) {
        let obj = {
          label: iterator.text,
          value: iterator.value,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const getRequestType = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject.getRequestType
        .requestTypes) {
        let obj = {
          label: iterator.text,
          value: iterator.value,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const getRequestCategorySubject = () => {
    var arrr1 = [];
    if (workCarrayRepairReducer.dataObject != null) {
      for (const iterator of workCarrayRepairReducer.dataObject
        .getRequestCategorySubject.requestTypes) {
        let obj = {
          label: iterator.text,
          value: iterator.value,
        };
        arrr1.push(obj);
      }
    }
    return arrr1;
  };

  const renderScene = SceneMap({
    workrepairdetail: () => (
      <WorkRepairDetailScreen
        {...props}
        data={workRepairDetailReducer.dataArray}
      />
    ),
    worksurvey: () => (
      <WorkSurveyScreen {...props} data={workRepairDetailReducer.dataArray} />
    ),
    workCarryRepair: () => (
      <WorkCarryRepairScreen
        {...props}
        empoyees={empoyees()}
        getLeakwounds={getLeakwounds()}
        getSerfaces={getSerfaces()}
        getTypeOfPipes={getTypeOfPipes()}
        getRequestTyp={getRequestType()}
        data={workRepairDetailReducer.dataArray}
      />
    ),
  });

  const switchTab = (idTab) => {
    setIndex(idTab);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route }) => (
              <Text
                style={{
                  fontFamily: "Prompt-Regular",
                  textAlign: "center",
                }}
              >
                {route.title}
              </Text>
            )}
            indicatorStyle={{ backgroundColor: "#3a405a" }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
      />
      <SafeAreaView>
        <BottomTab tab={index} switchTab={switchTab} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  scene: {
    flex: 1,
  },
});
