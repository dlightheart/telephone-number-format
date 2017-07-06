function formatPhoneNumber(context) {
    var phoneNumber = context.getEventSource();

    // Check if the field is undefined or null
    if (typeof (phoneNumber) != "undefined" && phoneNumber != null) {
        if (phoneNumber.getValue() != null) {
            // Remove any special characters
            var cleanNumber = phoneNumber.getValue().replace(/[^0-9,A-Z,a-z]/g, "");

            // If the number is a length we expect and support, 
            // format the translated number as +1 (XXX) XXX-XXXX
            switch (cleanNumber.length) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                    break;
                case 7:          // Seven digit number
                    phoneNumber.setValue(cleanNumber.substr(0, 3) + "-" + cleanNumber.substr(3, 4));
                    break;
                case 10:       // Ten digit number
                    phoneNumber.setValue("+1 " + "(" + cleanNumber.substr(0, 3) + ") " + cleanNumber.substr(3, 3) + "-" + cleanNumber.substr(6, 4));
                    break;
                default:       // More than ten digits, add a space after 10 digits
                    phoneNumber.setValue("+1 " + "(" + cleanNumber.substr(0, 3) + ") " + cleanNumber.substr(3, 3) + "-" + cleanNumber.substr(6, 4) + " " + cleanNumber.substr(10, cleanNumber.length));
                    break;
            }
        }
    }
}

