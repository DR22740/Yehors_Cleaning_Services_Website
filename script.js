// yehorsCS starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is registered
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('accountDropdownLink').textContent = user.firstName; // Add this line
        document.getElementById('accountDropdown').style.display = 'block'; // Add this line
        document.getElementById('registerLink').style.display = 'none'; // Add this line
    }
    
    // Handle form submission
   const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                event.stopPropagation();
                document.getElementById('confirmPassword').setCustomValidity('Passwords do not match');
            } else {
                document.getElementById('confirmPassword').setCustomValidity('');
            }

            if (registrationForm.checkValidity() === false) {
                event.stopPropagation();
                registrationForm.classList.add('was-validated');
            } else {
                const user = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    password: password // In a real app, never store passwords in plain text
                };

                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect to index page
                window.location.href = 'index.html';
            }
        }, false);

        // Clear custom validity message when user starts typing in confirm password field
        document.getElementById('confirmPassword').addEventListener('input', function() {
            this.setCustomValidity('');
        });
    
    }
    // Handle cleaning selection
    const cleaningButtons = document.querySelectorAll('.select-cleaning');
    cleaningButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Reset all buttons to be selectable
            cleaningButtons.forEach(btn => {
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-success');
                btn.textContent = 'Select';
                btn.disabled = false;
            });

            // Set the selected button state
            this.classList.remove('btn-outline-success');
            this.classList.add('btn-success');
            this.textContent = 'Selected';
            this.disabled = true;

            // Show the details section
            document.getElementById('detailsSection').style.display = 'block';
            // Update details section based on selected cleaning type if needed
            generateHouseSizeOptions();
            generateTimeOptions();
                // Call the function to populate the employee options
            generateEmployeeOptions();
        });
    });
        // Function to generate time options
        function generateTimeOptions() {
            const timeSelectors = document.querySelectorAll('select.time-select');
            const timeOptions = generateTimeArray();
            timeSelectors.forEach(select => {
                // Clear existing options
                select.innerHTML = '<option value="">Select time</option>';
                // Add new options
                timeOptions.forEach(time => {
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    select.appendChild(option);
                });
            });
        }
        function generateTimeArray() {
            return [
                "8:00 - 10:00",
                "10:00 - 12:00",
                "12:00 - 14:00",
                "14:00 - 16:00",
                "16:00 - 18:00",
                "18:00 - 20:00",
                "20:00 - 22:00"
            ];
        }
        function generateHouseSizeOptions() {
            const houseSizeSelect = document.getElementById('houseSize');
            for (let i = 100; i <= 500; i += 25) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i} square meters`;
                houseSizeSelect.appendChild(option);
            }
        }
      // Handle adding new time selection menus
    document.querySelectorAll('.add-time-btn').forEach(button => {
        button.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            const container = document.getElementById(`${day}Container`);
            const currentMenus = container.querySelectorAll('.input-group').length;

            if (currentMenus < 4) {
                const newMenu = document.createElement('div');
                newMenu.classList.add('input-group', 'mt-2');
                newMenu.innerHTML = `
                    <select class="form-control time-select">
                        <option value="">Select time</option>
                    </select>
                `;
                container.appendChild(newMenu);

                // Generate time options for the new menu
                generateTimeOptions();
            }
        });
    });
    

    
    // Handle logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
      // Handle book cleaning button click
      try {
        const bookCleaningButton = document.getElementById('bookCleaningButton');
        bookCleaningButton.addEventListener('click', function(event) {
            if (!localStorage.getItem('user')) {
                event.preventDefault();
                window.location.href = 'registration.html';
            }
        });
    } catch (error) {
        console.error('Ignore this error', error);
    }
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Checkout button clicked');

            const cleaningData = {
                houseSize: document.getElementById('houseSize').value,
                specificRequests: document.getElementById('specificRequests').value,
                additionalNotes: document.getElementById('additionalNotes').value,
                selectedCleaner: document.getElementById('employeeName').value,
                timeSelections: {}
            };

            // Collect time selections for each day
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            days.forEach(day => {
                const timeSelects = document.querySelectorAll(`#${day}Container select`);
                cleaningData.timeSelections[day] = Array.from(timeSelects).map(select => select.value);
            });

            // Log the collected data for debugging
            console.log('Collected cleaning data:', cleaningData);

            // Store data in localStorage
            localStorage.setItem('cleaningData', JSON.stringify(cleaningData));

            // Redirect to summary page
            window.location.href = 'confirmation.html';
        });
    }
    function generateEmployeeOptions() {
        const employeeSelect = document.getElementById('employeeName');
        const employees = [
            { name: 'John Doe', phone: '647-555-1234', email: 'john@yehorsCS.com' },
            { name: 'Jane Smith', phone: '647-555-5678', email: 'jane@yehorsCS.com' },
            { name: 'Emily Johnson', phone: '647-555-8765', email: 'emily@yehorsCS.com' },
            { name: 'Michael Brown', phone: '647-555-4321', email: 'michael@yehorsCS.com' },
            { name: 'Jessica Davis', phone: '647-555-6789', email: 'jessica@yehorsCS.com' },
            { name: 'David Wilson', phone: '647-555-9876', email: 'david@yehorsCS.com' },
            { name: 'Sarah Miller', phone: '647-555-5432', email: 'sarah@yehorsCS.com' }
        ];
    
        employees.forEach(employee => {
            const option = document.createElement('option');
            option.value = `${employee.name} - ${employee.phone} - ${employee.email}`;
            option.textContent = `${employee.name} - ${employee.phone} - ${employee.email}`;
            employeeSelect.appendChild(option);
    
});
    }
});