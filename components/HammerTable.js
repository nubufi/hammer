import React, { useState } from 'react';
import { Card, DataTable, TextInput, Button, Modal, Portal } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { ScrollView } from 'react-native';

const HammerModal = (props) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [hammerAngle, setHammerAngle] = useState("");
    const [axisName, setAxisName] = useState("");

    const [hammers, setHammers] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const modifyHammerList = (value, index) => {
        let newHammers = [...hammers];
        let parsedValue = parseInt(value);
        newHammers[index - 1] = isNaN(parsedValue) ? '' : parsedValue;
        setHammers(newHammers);
    }
    const calcAverage = (array) => {
        let sum = 0;
        let count = 0;
        array.forEach((value) => {
            if (value > 0) {
                sum += value;
                count++;
            }
        }
        )
        return count > 0 ? sum / count : 0;
    }
    const submitForm = (rowIndex) => {
        if (hammers.includes(0) || hammers.includes('')) {
            alert("Lütfen tüm vuruşları doldurunuz.");
            return;
        }
        if (axisName === '') {
            alert("Lütfen aks adını giriniz.");
            return;
        }
        if (hammerAngle === '') {
            alert("Lütfen vuruş açısını giriniz.");
            return;
        }

        const average = calcAverage(hammers);
        props.setAverage({ ...props.average, [rowIndex]: average });
        props.setHammerAngle({ ...props.hammerAngle, [rowIndex]: hammerAngle });
        props.setAxisName({ ...props.axisName, [rowIndex]: axisName });
        props.setStrikes({ ...props.strikes, [rowIndex]: hammers });
        props.hideModal();
    }

    const angleList = [
        { label: '>', value: ">" },
        { label: 'v', value: "v" },
    ]
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
                <ScrollView>
                    <TextInput mode="outlined" label="Aks Adı" value={axisName} onChangeText={setAxisName} />
                    <DropDown
                        label="Vuruş Açısı"
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={hammerAngle}
                        setValue={setHammerAngle}
                        list={angleList}
                    />
                    <TextInput mode="outlined" keyboardType='numeric' label="1. Vuruş" value={hammers[0].toString()} onChangeText={text => modifyHammerList(text, 1)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="2. Vuruş" value={hammers[1].toString()} onChangeText={text => modifyHammerList(text, 2)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="3. Vuruş" value={hammers[2].toString()} onChangeText={text => modifyHammerList(text, 3)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="4. Vuruş" value={hammers[3].toString()} onChangeText={text => modifyHammerList(text, 4)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="5. Vuruş" value={hammers[4].toString()} onChangeText={text => modifyHammerList(text, 5)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="6. Vuruş" value={hammers[5].toString()} onChangeText={text => modifyHammerList(text, 6)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="7. Vuruş" value={hammers[6].toString()} onChangeText={text => modifyHammerList(text, 7)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="8. Vuruş" value={hammers[7].toString()} onChangeText={text => modifyHammerList(text, 8)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="9. Vuruş" value={hammers[8].toString()} onChangeText={text => modifyHammerList(text, 9)} />
                    <TextInput mode="outlined" keyboardType='numeric' label="10. Vuruş" value={hammers[9].toString()} onChangeText={text => modifyHammerList(text, 10)} />
                    <Button onPress={() => submitForm(props.index)}>
                        Kaydet
                    </Button>
                </ScrollView>
            </Modal>
        </Portal>
    )

}
const TableRow = (props) => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false)

    return (
        <DataTable.Row>
            <DataTable.Cell>
                {props.index}
            </DataTable.Cell>

            <DataTable.Cell>
                <HammerModal
                    visible={visible}
                    hideModal={hideModal}
                    average={props.average}
                    hammerAngle={props.hammerAngle}
                    axisName={props.axisName}
                    strikes={props.strikes}
                    index={props.index}
                    setAverage={props.setAverage}
                    setHammerAngle={props.setHammerAngle}
                    setAxisName={props.setAxisName}
                    setStrikes={props.setStrikes}
                />
                <Button icon="plus" color="blue" onPress={showModal}>
                </Button>
            </DataTable.Cell>

            <DataTable.Cell numeric={true}>
                {props.average[props.index].toFixed(0)}
            </DataTable.Cell>
        </DataTable.Row>
    )
}
const HammerTable = (props) => {
    return (
        <Card mode="outlined">
            <Card.Content>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>#</DataTable.Title>
                        <DataTable.Title>Vuruşlar</DataTable.Title>
                        <DataTable.Title numeric={true}>Ortalama</DataTable.Title>
                    </DataTable.Header>
                    {[...Array(props.hammerNumber).keys()].map((i) => {
                        return (
                            <TableRow
                                key={i}
                                index={i + 1}
                                average={props.average}
                                hammerAngle={props.hammerAngle}
                                axisName={props.axisName}
                                strikes={props.strikes}
                                setAverage={props.setAverage}
                                setHammerAngle={props.setHammerAngle}
                                setAxisName={props.setAxisName}
                                setStrikes={props.setStrikes}
                            />
                        )
                    })}
                </DataTable>
            </Card.Content>
        </Card>
    )

}

export default HammerTable
