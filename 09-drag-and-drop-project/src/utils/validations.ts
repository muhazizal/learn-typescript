namespace App {
  // Validation
  export interface Validation {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }

  export function validateUserInputs(validation: Validation): boolean {
    let isValid: boolean = true

    if (validation.required) {
      isValid = isValid && validation.value.toString().trim().length > 0
    }
    if (validation.minLength && typeof validation.value === 'string') {
      isValid = isValid && validation.value.length > validation.minLength
    }
    if (validation.maxLength && typeof validation.value === 'string') {
      isValid = isValid && validation.value.length < validation.maxLength
    }
    if (validation.min && typeof validation.value === 'number') {
      isValid = isValid && validation.value >= validation.min
    }
    if (validation.max && typeof validation.value === 'number') {
      isValid = isValid && validation.value <= validation.max
    }

    return isValid
  }
}
