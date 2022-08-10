const calcHammerNumber = (concreteVolume) => {
    if (concreteVolume > 0 && concreteVolume <= 30) {
        return 3;
    } else if (concreteVolume > 30 && concreteVolume <= 180) {
        return 12;
    } else if (concreteVolume > 180 && concreteVolume <= 360) {
        return 40;
    } else if (concreteVolume > 360 && concreteVolume <= 540) {
        return 60;
    } else {
        return 80;
    }
}

const calcCoreNumber = (concreteVolume) => {
    if (concreteVolume > 0 && concreteVolume <= 30) {
        return 2;
    } else if (concreteVolume > 30 && concreteVolume <= 180) {
        return 3;
    } else if (concreteVolume > 180 && concreteVolume <= 360) {
        return 6;
    } else if (concreteVolume > 360 && concreteVolume <= 540) {
        return 9;
    } else {
        return 12;
    }
}


const calcAgeConstant = (concreteAge) => {
    return 6E-07 * (concreteAge ^ 2) - 0.0009 * concreteAge + 1.0421;
}
const calcStresses = (averageDict, angle, concreteAge) => {
    const ageConstant = calcAgeConstant(concreteAge);
    const stressMap = Object.keys(averageDict).map((key) => {
        let stress = 0;
        if (angle == ">") {
            stress = (-0.0017 * averageDict[key] ^ 3 + 0.3011 * averageDict[key] ^ 2 + 1.8198 * averageDict[key] - 86.942) * ageConstant
        } else {
            stress = (-0.0023 * averageDict[key] ^ 3 + 0.3768 * averageDict[key] ^ 2 - 0.6489 * averageDict[key] - 12.076) * ageConstant
        }
        return [key, stress];
    })

    return stressMap
}

const selectAxis = (stressMap, axisDict, concreteVolume) => {
    const mapSort = new Map(stressMap.sort((a, b) => a[1] - b[1]));
    let sortedAxises = [];

    for (const avg of mapSort.entries()) {
        sortedAxises.push(axisDict[avg[0]])
    }
    const coreNumber = calcCoreNumber(concreteVolume);
    const midPoint = Math.floor(sortedAxises.length / 2);
    console.log(coreNumber)
    switch (coreNumber) {
        case 2:
            return sortedAxises.slice(0, 2);
        case 3:
            return [...sortedAxises.slice(0, 1), ...sortedAxises.slice(midPoint, midPoint + 1)];
        case 6:
            return [...sortedAxises.slice(0, 2), ...sortedAxises.slice(midPoint, midPoint + 3)];
        case 9:
            return [...sortedAxises.slice(0, 3), ...sortedAxises.slice(midPoint, midPoint + 5)];
        default:
            return [...sortedAxises.slice(0, 4), ...sortedAxises.slice(midPoint, midPoint + 7)];
    }
}

export { calcHammerNumber, calcAgeConstant, calcStresses, selectAxis };