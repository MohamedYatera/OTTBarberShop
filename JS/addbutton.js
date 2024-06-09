$(document).ready(function() {
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        var x = $(".tab");
        x.eq(n).addClass("current");
        // Fix the Previous/Next buttons:
        if (n == 0) {
            $("#prevBtn").hide();
        } else {
            $("#prevBtn").show();
        }
        if (n == (x.length - 1)) {
            $("#nextBtn").text("Submit");
        } else {
            $("#nextBtn").text("Next");
        }
        // Update the step indicator
        fixStepIndicator(n);
    }

    function nextPrev(n) {
        var x = $(".tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x.eq(currentTab).removeClass("current");
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form... :
        if (currentTab >= x.length) {
            //...the form gets submitted:
            $("#regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = $(".tab");
        y = x.eq(currentTab).find("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        var i, x = $(".step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
    }

    $("#addServiceBtn").click(function() {
        var newServiceDropdown = `
            <div class="form-group mt-3">
                <label for="services">Select a service</label>
                <select class="form-select" id="services" name="services[]" required>
                                <option value="pricing" selected>HairCut $25</option>
                                <option value="content">Haircut Kids (Under 12) $25</option>
                                <option value="other">Haircut (Military and Seniors) $15</option>
                                <option value="other">Hair & Beard $40</option>
                                <option value="other">Hair & Hot Shave $45</option>
                                <option value="other">Beard $20</option>
                                <option value="other">Thread $20</option>
                                <option value="other">Outline $20</option>
                                <option value="other">Shampoo $20</option>
                </select>
            </div>
        `;
        $("#service-container").append(newServiceDropdown);
    });
});