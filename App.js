import React, { useState } from 'react';
import { StyleSheet, ScrollView, AppRegistry, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import BuildingProps from './components/BuildingProps';
import Colors from './components/Colors';
import HammerTable from './components/HammerTable';
import { calcHammerNumber, calcStresses, selectAxis } from './subroutines/calculations';
import SelectedAxis from './components/SelectedAxis';
import sendEmail from './subroutines/send_mail';

function App() {
  const [buildingInput, setBuildingInput] = useState({
    buildingOwner: '',
    buildingPart: '',
    yibf: '',
    concreteAge: '',
    concreteVolume: '',
  });
  const [axisName, setAxisName] = useState({});
  const [strikes, setStrikes] = useState({});
  const [hammerAngle, setHammerAngle] = useState({});
  const [average, setAverage] = useState({ 1: 0 });
  const [hammerNumber, setHammerNumber] = useState(1);
  const [selectedAxises, setSelectedAxises] = useState([]);

  const modifyTable = (volume) => {
    setBuildingInput({ ...buildingInput, concreteVolume: volume });
    const newHammerNumber = calcHammerNumber(volume);
    setHammerNumber(newHammerNumber)
    let averageMap = { ...average };
    for (let i = 1; i <= newHammerNumber; i++) {
      if (averageMap[i] === undefined) {
        averageMap[i] = 0;
      }
    }
    setAverage(averageMap);

  };

  const sendMail = () => {
    if (buildingInput.buildingOwner === '') {
      alert('Yapı sahibini giriniz.');
      return;
    }
    if (buildingInput.buildingPart === '') {
      alert('Yapı elemanını giriniz.');
      return;
    }
    if (buildingInput.yibf === '') {
      alert('Yibf numarasını giriniz.');
      return;
    }
    if (buildingInput.concreteAge === '') {
      alert('Beton yaşını giriniz.');
      return;
    }
    if (buildingInput.concreteVolume === '') {
      alert('Döküm miktarını giriniz.');
      return;
    }
    const inputParams = {
      buildingInput: buildingInput,
      axisName: axisName,
      average: average,
      strikes: strikes,
      hammerAngle: hammerAngle,
      selectedAxises: selectedAxises,
    }

    sendEmail(inputParams).then((result) => {
      if (result) {
        alert('Mail başarıyla gönderildi.');
      } else {
        alert('Mail gönderilemedi.');
      }
    });
  };

  const selectAxises = () => {
    const stresses = calcStresses(average, hammerAngle, buildingInput.concreteAge);
    setSelectedAxises(selectAxis(stresses, axisName, buildingInput.concreteVolume));
  }

  const callbackFunctions = {
    buildingOwner: (text) => setBuildingInput((prevState) => {
      return { ...prevState, buildingOwner: text }
    }),
    buildingPart: (text) => setBuildingInput((prevState) => {
      return { ...prevState, buildingPart: text }
    }),
    yibf: (text) => setBuildingInput((prevState) => {
      return { ...prevState, yibf: text }
    }),
    concreteAge: (text) => setBuildingInput((prevState) => {
      return { ...prevState, concreteAge: text }
    }),
    concreteVolume: (text) => modifyTable(text),
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.innerContainer}>
        <BuildingProps callbacks={callbackFunctions} />
        <HammerTable
          hammerNumber={hammerNumber}
          average={average}
          hammerAngle={hammerAngle}
          axisName={axisName}
          strikes={strikes}
          setAverage={setAverage}
          setHammerAngle={setHammerAngle}
          setAxisName={setAxisName}
          setStrikes={setStrikes}
        />
        <Button mode="contained" color="blue" onPress={selectAxises}>Karot Elemanlarını Seç</Button>
        <SelectedAxis selectedAxises={selectedAxises} />
        {selectedAxises.length > 0 && <Button mode="contained" color="blue" onPress={sendMail}>Mail Gönder</Button>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBackground,
    flex: 1,
    paddingTop: 30,
  },
  innerContainer: {
    marginBottom: 50
  }
});

export default function Main() {
  return (
    <PaperProvider >
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent("Test Çekici Programı", () => Main);