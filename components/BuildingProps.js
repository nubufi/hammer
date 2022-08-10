import React from 'react';
import { Card, TextInput } from 'react-native-paper';

const BuildingProps = (props) => {
    return (
        <Card mode="outlined">
            <Card.Title title="Test Çekici Programı" />
            <Card.Content>
                <TextInput mode="outlined" label="Yapı Sahibi" onChangeText={props.callbacks.buildingOwner} />
                <TextInput mode="outlined" label="Yapı Elemanı" onChangeText={props.callbacks.buildingPart} />
                <TextInput mode="outlined" keyboardType='numeric' label="Yibf No." onChangeText={props.callbacks.yibf} />
                <TextInput mode="outlined" keyboardType='numeric' label="Beton Yaşı" onChangeText={props.callbacks.concreteAge} />
                <TextInput mode="outlined" keyboardType='numeric' label="Döküm Miktarı(m3)" onChangeText={props.callbacks.concreteVolume} />
            </Card.Content>
        </Card >
    );

}

export default BuildingProps