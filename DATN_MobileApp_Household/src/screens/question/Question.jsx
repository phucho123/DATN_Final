import React, { useEffect, useRef, useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomInput from "../../components/customInput/CustomInput";
import Icon from "react-native-vector-icons/Ionicons";
import Message from "../../components/question/Message";
import axios from "axios";
import { OPENAI_KEY } from "../../../secrete";


const Question = () => {
  const [text, setText] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  ///new code////
  const scrollViewRef = useRef();


  const sendQuestion = async (question) => {
    const res = await axios('https://api.openai.com/v1/chat/completions', {
      responseType: "json",
      method: "POST",
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": question
          }
        ]
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      }
    });

    if (res.status == 200) {
      setMessageArr((pre) => [...pre, {
        role: "bot",
        message: res.data.choices[0].message.content
      }]);
    } else {
      console.log(res);
    }
  }



  const handleSubmit = async () => {
    setMessageArr((pre) => [...pre, {
      role: "user",
      message: text
    }]);
    setText("");
    await sendQuestion(text);
  }


  return (
    <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "#D9FBFF" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <View style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            {
              messageArr.map((message, index) => (
                <Message message={message.message} role={message.role} key={index} />
              ))
            }
          </View>
        </ScrollView>
        <View style={{
          width: "100%",
          bottom: 0,
          backgroundColor: "white",
          paddingHorizontal: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <CustomInput
            containerStyle={{ marginVertical: 4, flex: 1 }}
            onChangeText={setText}
            defaultValue={text}
          />
          <Icon.Button name="send" iconStyle={{ marginRight: 0 }} color="blue" size={30} backgroundColor="white" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Question;
