import { Validate } from "src/Interfaces/project-interface";

export function validateField(validateInput: Validate) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.maxLength && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length <= validateInput.maxLength
    }
    if (validateInput.minLength && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length >= validateInput.minLength
    }
    if (validateInput.min && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value >= validateInput.min
    }
    if (validateInput.max && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value <= validateInput.max
    }
    return isValid
}