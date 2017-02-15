var variables = {};
function setVariable(key, value) {
    variables[key] = value;
}

function getVariable(key) {
    return variables[key];
}

export default {
    _variables: variables,
    setVariable: setVariable,
    getVariable: getVariable
};