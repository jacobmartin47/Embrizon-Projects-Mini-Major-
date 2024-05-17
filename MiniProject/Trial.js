document.addEventListener('DOMContentLoaded', function() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl);
    });

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        var name = document.getElementById('name').value;
        var dob = document.getElementById('dob').value;
        var gender = document.querySelector('input[name="gender"]:checked');
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var streetAddress = document.getElementById('streetAddress').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var zip = document.getElementById('zip').value;
        var eventPreferences = document.getElementById('eventPreferences').value;
        var dietaryRestrictions = document.getElementById('dietaryRestrictions').value;
        var tshirtSize = document.getElementById('tshirtSize').value;

        // Validate form fields
        if (!validateForm(name, dob, gender, email, phone, streetAddress, city, state, zip, eventPreferences, dietaryRestrictions, tshirtSize)) {
            return; // Stop form submission if validation fails
        }

        // Show success toast message
        var successToast = document.getElementById('successToast');
        var bsToast = new bootstrap.Toast(successToast);
        bsToast.show();

        // Reset form fields
        this.reset();
    });
});

// Function to validate form fields
function validateForm(name, dob, gender, email, phone, streetAddress, city, state, zip, eventPreferences, dietaryRestrictions, tshirtSize) {
    // Regular expressions for email, phone number, and date of birth validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^\d{10}$/;
    var dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if any required field is empty
    if (!name || !dob || !gender || !email || !phone || !streetAddress || !city || !state || !zip || !eventPreferences || !tshirtSize) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate phone number format
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    // Validate date of birth format
    if (!dobRegex.test(dob)) {
        alert('Please enter a valid date of birth in YYYY-MM-DD format.');
        return false;
    }

    // Validate zip code format
    if (zip.length !== 5 || isNaN(zip)) {
        alert('Please enter a valid 5-digit zip code.');
        return false;
    }

    // Validate event preferences selection
    if (eventPreferences === "Select Preference") {
        alert('Please select your event preference.');
        return false;
    }

    // Validate t-shirt size selection
    if (tshirtSize === "Select Size") {
        alert('Please select your t-shirt size.');
        return false;
    }

    // Optional: Validate dietary restrictions length
    if (dietaryRestrictions.length > 100) {
        alert('Dietary restrictions should not exceed 100 characters.');
        return false;
    }

    // Additional validation logic for other fields
    // Checking if the name contains only alphabetic characters
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Name should contain only alphabetic characters.');
        return false;
    }

    // Ensuring the street address does not contain special characters
    if (!/^[a-zA-Z0-9\s,'-]*$/.test(streetAddress)) {
        alert('Street address should not contain special characters.');
        return false;
    }

    // Validating the length of other fields
    // For example, you can add validation for city, state, etc.
    if (city.length > 50) {
        alert('City should not exceed 50 characters.');
        return false;
    }

    // If all validations pass, return true
    return true;
}
