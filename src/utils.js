export function percentDifference(oldNumber, newNumber) {
    return +(100 * Math.abs(((newNumber - oldNumber)/((newNumber + oldNumber)/2)))).toFixed(2)
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}