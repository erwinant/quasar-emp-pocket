const REQUIRED_MSG = "This field is required";
const NUMBERONLY_MSG = "Number required";
const EMAIL_MSG = "Invalid email";
export const Validator = {
    revealValidator: (val, collOfValidator) => {
        let valid = false
        collOfValidator.some(f => {
            switch (f) {
                case "required":
                    valid = val && (val.length > 0) ? true : REQUIRED_MSG
                    if (valid === REQUIRED_MSG)
                        return valid
                    break;
                case "number":
                    valid = !isNaN(val) || NUMBERONLY_MSG
                    if (valid === NUMBERONLY_MSG)
                        return valid
                    break;
                case "email":
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    valid = re.test(String(val).toLowerCase()) || EMAIL_MSG
                    if (valid === EMAIL_MSG)
                        return valid
                    break;
            }
        })
        return valid
    }
}

export const FormHelper = {
    toObject: (formField) => {
        let output = {}
        formField.forEach(el => {
            output[el.key] = el.value
        });
        return output
    },
    toFormField: (obj, formField) => {
        return formField.map(el => {
            el.value = obj[el.key] || ""
            return el
        });
    }
}

export const CommonHelper = {
    groupFunc: (value = [], field = "") => {
        const groupedObj = value.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            } else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
}