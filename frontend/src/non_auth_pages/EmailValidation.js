function EmailValidation(values) {
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!mailformat.test(values.email)) {
        alert("Error: Invalid email address!");
        return false;
    }

    return true;

}

export default EmailValidation;