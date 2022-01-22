import React from "react";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

export default function TodoList({ item }) {

  const completed = item.completed;

  const completeTask = (id) => { 
    console.log(id);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "item":{"completed": true} })
  };
  fetch('http://10.0.2.2:8000/api/item/'+id, requestOptions)
      .then(response => response.json())
      .done();    
  };

  const deleteItem = (id) => {
    console.log(id);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  };
  fetch('http://10.0.2.2:8000/api/item/'+ id, requestOptions)
      .done();

  };

  if (completed === 1) {
    var dataid = item.id;
    console.log(dataid);
    return (
      <ComponentContainer>
        <ListContainer>
          <CirlceContainer>
            <Entypo name="circle" size={20} color="red" />
          </CirlceContainer>
          <View>
            <TextItem>{item.name}</TextItem>
            <TextDate>Completed at {item.completed_at}</TextDate>
          </View>
          <IconContainer>
            <MaterialIcons name="delete" onPress={() => deleteItem(dataid)} size={24} color="midnightblue" />
          </IconContainer>
        </ListContainer>
      </ComponentContainer>
    );

  } else {
    var dataid = item.id;
    console.log(dataid);
    return (

      
      <ComponentContainer>
        <ListContainer>
          <CirlceContainer>
            <Entypo name="circle" size={20} color="midnightblue" 
            onPress={() => {completeTask(dataid)}}
            />
          </CirlceContainer>
          <View>
            <TextItem>{item.name}</TextItem>
            <TextDate>Created at {item.created_at}</TextDate>
            
          </View>
          <IconContainer>
            <MaterialIcons name="delete" onPress={() => deleteItem(dataid)} size={24} color="midnightblue" />
          </IconContainer>
        </ListContainer>
      </ComponentContainer>
    );
          dataid = 0;
          console.log(dataid);
  }
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
  font-family: poppins-regular;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;

  font-family: poppins-regular;
  border-radius: 10px;
  width: 200px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;
