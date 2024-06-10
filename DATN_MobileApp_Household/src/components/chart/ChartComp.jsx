import React from "react";
import { Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ChartComp = ({ title, data }) => {
  const labelsList = data.map((item) => item.time);
  console.log(data);
  const labels = data.map((item) => {
    if (!item.time) {
      return "N/A";
    }

    const dateTimeParts = item.time.split(", ");
    if (dateTimeParts.length < 2) {
      return "N/A";
    }

    const dateParts = dateTimeParts[0].split("/");
    const day = dateParts[0];
    const month = dateParts[1];
    // return `${day}/${month}`;
    const res = day.split(":")[0] + ":" + day.split(":")[1];
    return res;
  });

  const valueList = data.map((item) => item.value);
  const dataArr = valueList.length > 5 ? valueList.slice(-5) : valueList;

  return (
    <View style={{ width: "100%" }}>
      <Text style={{ fontSize: 18, color: "orange", fontWeight: "bold", textAlign: "center", marginBottom: 4 }}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: "#BEFBC8",
          padding: 16,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#0F9D58",
          gap: 4,
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 16, color: "#0F9D58" }}>
          Lớn nhất: <Text>{Math.max(...valueList)}</Text>
        </Text>
        <Text style={{ fontWeight: 600, fontSize: 16, color: "#0F9D58" }}>
          Nhỏ nhất: <Text>{Math.min(...valueList)}</Text>
        </Text>
        <Text style={{ fontWeight: 600, fontSize: 16, fontStyle: "italic", color: "#0F9D58" }}>
          Cập nhật mới nhất lúc: <Text>{labelsList[labelsList.length - 1]}</Text>
        </Text>
      </View>
      <View>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: dataArr,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          // yAxisLabel="m³"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#4285f4",
            backgroundGradientFrom: "#4285F4",
            backgroundGradientTo: "#C7DCFE",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 12, // Adjust the font size as needed
              paddingHorizontal: 5, // Adjust the horizontal padding as needed
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 12,
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
};

export default ChartComp;
