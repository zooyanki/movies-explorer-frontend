import {useEffect, useState} from 'react';

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(true);
    const [inputValid, setInputValid] = useState(false);


    useEffect(
        () => {
            for (const validation in validations) {
                switch(validation) {
                
                    case 'minLength':
                        if(value.length < validations[validation]) {
                            setMinLengthError(true)
                            setErrorMessage('Пустое поле')
                            if (value) {
                                setErrorMessage(`Менее ${validations.minLength} символов`)
                            }
                        } else {
                            setMinLengthError(false)
                        }                         
                        break;

                    case 'maxLength':
                        if(value.length > validations[validation]) {
                            setMaxLengthError(true)
                            if (value) {
                                setErrorMessage(`Более ${validations.maxLength} символов`)
                            }                            
                        } else {
                            setMaxLengthError(false)
                        }                         
                        break;

                    case 'isEmpty':
                        if(value){ 
                            setIsEmpty(false)
                        } else {
                            setIsEmpty(true)
                            setErrorMessage('Пустое поле')
                        }
                        break;

                    case 'emailError':
                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(String(value).toLowerCase())) {
                            setEmailError(true)
                            setErrorMessage('Пустое поле')
                            if (value) {
                                setErrorMessage('Не корректный e-mail')
                            }
                        } else {
                            setEmailError(false);
                        }
                        break;

                    default:
                }
            }
        },
        [value]
    )

    useEffect(
        () => {
            if(minLengthError || isEmpty || emailError || maxLengthError) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        },
        [minLengthError, isEmpty, emailError, maxLengthError]
    )

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        errorMessage,
        emailError,
        inputValid,        
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
        console.log(e)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}


export default useInput;

