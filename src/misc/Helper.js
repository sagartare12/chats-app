export function getNameInitial(name){
    const splitName = name.toUpperCase().split(' ');

    if(splitName.length > 1){
        return splitName[0][0] + splitName[1][0];
    }
    return (splitName[0][0] + splitName[0][1]);
}

export function transformToArrayWithId(snapVal) {
    return snapVal ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId],id:roomId};
    }):[]
}