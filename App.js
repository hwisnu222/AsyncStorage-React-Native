import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

// please first install asyncstorage package
import AsyncStorage from "@react-native-async-storage/async-storage";

//import module from react native
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // create state
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  //save data to storage local
  function saveData() {
    // because AsyncStorage save with type string, you must change value using JSON.stringify
    AsyncStorage.setItem("id", JSON.stringify(id));
    AsyncStorage.setItem("name", JSON.stringify(name));
    alert("Data Tersimpan");
  }

  //get data asyncstorage
  async function viewData() {
    try {
      const idUser = await AsyncStorage.getItem("id");
      const nameUser = await AsyncStorage.getItem("name");
      setId(JSON.parse(idUser));
      setName(JSON.parse(nameUser));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{id}</Text>
      <Text>{name}</Text>
      <View style={styles.resultStorage}>
        <TextInput
          style={styles.input}
          placeholder="Id"
          onChangeText={(value) => setId(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => setName(value)}
        />
      </View>

      <TouchableOpacity onPress={() => saveData()} style={styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => viewData()} style={styles.button}>
        <Text>View</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },

  resultStorage: {
    width: "100%",
    marginVertical: 24,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "orange",
    padding: 8,
    marginBottom: 16,
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    paddingVertical: 8,
    width: "100%",
    marginBottom: 16,
    borderRadius: 5,
  },
});
