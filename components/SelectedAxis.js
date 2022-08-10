import React from 'react';
import { Card, Text } from 'react-native-paper';

const SelectedAxis = (props) => {
    return (
        <Card mode="outlined">
            <Card.Title title="Karot Alınacak Akslar" />
            <Card.Content>
                {props.selectedAxises.map((axis, index) => {
                    return (
                        <Text key={index}>{axis}</Text>
                    )
                })}
            </Card.Content>
        </Card>
    )
}



export default SelectedAxis;