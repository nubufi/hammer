const sendRequest = async (inputParams) => {
    const requestData = createRequestData(inputParams);
    try {
        const response = await fetch(
            'http://135.181.30.111:9001/send-mail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }
        );
        const json = await response.json();
        return json.status;
    } catch (error) {
        console.error(error);
    }
};

const getDictValues = (dict) => {
    let values = [];
    for (let key in dict) {
        values.push(dict[key]);
    }
    return values;
}

const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
}
const createRequestData = (inputParams) => {
    const requestData = {
        yibf: parseInt(inputParams.buildingInput.yibf),
        average_R: getDictValues(inputParams.average),
        R: getDictValues(inputParams.strikes),
        bore_axises: inputParams.selectedAxises,
        building_element: getDictValues(inputParams.axisName),
        concrete_age: parseInt(inputParams.buildingInput.concreteAge),
        hammer_angle: getDictValues(inputParams.hammerAngle),
        date: getCurrentDate(),
        building_owner: inputParams.buildingInput.buildingOwner,
        concrete_volume: parseFloat(inputParams.buildingInput.concreteVolume),
    }
    return requestData
}

export default sendRequest