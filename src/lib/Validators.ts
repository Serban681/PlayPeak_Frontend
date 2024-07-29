const checkFieldsNotEmpty = (obj:Object, isValid=true): boolean => {
    Object.entries(obj).forEach(([key, value]) => { 
        if(typeof value === 'string') {
            if(value === '') {
                isValid = false;
                return isValid;
            }
        } else if(typeof value === 'object') {
            isValid = checkFieldsNotEmpty(value, isValid);
        }
     });

    return isValid;
}

export {checkFieldsNotEmpty}
