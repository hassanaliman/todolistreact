import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, Text, Alert } from "react-native";
import styled from "styled-components";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Empty from "./Components/Empty";
import Header from "./Components/Header";

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/items')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }, []);

  console.log(data);
  const submitHandler = (value) => {
      // Simple POST request with a JSON body using fetch

      if(!value){
        Alert.alert(
          "Alert",
          "Can not be empty",
          [
            
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      } else { 
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "item":{"name":value} })
      };
      fetch('http://10.0.2.2:8000/api/item/store', requestOptions)
          .then(response => response.json())
          .then()
          .done();

          return <Blink></Blink>;
      }
      

  };
  
  if (fontsLoaded) {
    return (
      <ComponentContainer>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#05445E" />
        </View>

        <View>
        
        <FlatList
    data={data}
    ListHeaderComponent={() => <Header />}
    ListEmptyComponent={() => <Empty />}
    keyExtractor={({ id }, index) => id}
    renderItem={({ item }) => <TodoList item={item}/> }
    />
          
          <View>
            <AddInput submitHandler={submitHandler} />
          </View>
        </View>
      </ComponentContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

const ComponentContainer = styled.View`
  background-color: #05445E;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;