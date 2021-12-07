/*filtar un array de objetos por campo*/
function Filters(dataArray, field, parameter) {
    return dataArray.filter(item => item[field] === parameter);
}

function FilterTwo(dataArray, field_1, field_2, parameter_1, parameter_2) {
    const filter = dataArray.filter(item => item[field_1] === parameter_1);
    return filter.filter(item => item[field_2] === parameter_2);
}

/*Filtra y devulve los elementos diferentes*/
function FilterDelete(dataArray, field, parameter) {
    return dataArray.filter(item => item[field] !== parameter);
}

/*Filter array by key*/
function FilterByKey(dataArray, keyItem) {
    let result = null;
    let pos = null;
    dataArray.forEach((item, i) => {
        if (Object.keys(item)[0] === keyItem) {
            result = item;
            pos = i;
        }
    });
    return {result: result, pos: pos};
}


/*Actualizar un array de objetos por un campo*/
function UpdateArray(dataArray, field, param, key, value) {
    const elementsIndex = dataArray.findIndex(element => element[field] === param);
    let newArray = [...dataArray];
    newArray[elementsIndex] = {
        ...newArray[elementsIndex], [key]: value,
    };
    return newArray;
}

/*Ordenar*/
function Order(dataArray, field) {
    return dataArray.sort((a, b) => (a[field] > b[field]) ? 1 : -1);
}


export {Filters, FilterTwo, FilterDelete, FilterByKey, UpdateArray, Order};
