document.getElementById('paymentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get user input (amount, payment type, and email)
    const amount = document.getElementById('amount').value;
    const paymentType = document.getElementById('paymentType').value;
    const userEmail = document.getElementById('email').value;

    // Validate the amount (allow only numbers)
    if (!isNumeric(amount)) {
        // Display an error message
        displayErrorMessage('Amount must be numeric.');
        return;
    }

    // Validate email format
    if (!isValidEmail(userEmail)) {
        // Display an error message
        displayErrorMessage('Invalid email address.');
        return;
    }

    try {
        // Simulate payment processing (replace with actual payment gateway integration)
        const paymentResult = await processPayment(amount, paymentType);

        // Check if payment was successful
        if (paymentResult.success) {
            // Generate an invoice (replace with your invoice generation logic)
            const invoice = generateInvoice(amount, paymentType);

            // Send the invoice via SendGrid
            await sendEmailToUser(userEmail, invoice);

            // Redirect the user to a thank you page
            window.location.href = 'thankyou.html';
        } else {
            // Payment failed, display an error message
            displayErrorMessage('Payment failed. Please try again.');
        }
    } catch (error) {
        console.error(error);
        displayErrorMessage('An error occurred. Please try again later.');
    }
});

// Function to simulate payment processing (replace with actual payment gateway integration)
async function processPayment(amount, paymentType) {
    // Simulate a successful payment
    return { success: true, paymentId: '123456' };
}

// Function to generate an invoice (replace with your invoice generation logic)
function generateInvoice(amount, paymentType) {
    // Simulate invoice generation
    const date = new Date().toLocaleDateString();
    return `Invoice\n\nDate: ${date}\nAmount: $${amount}\nPayment Type: ${paymentType}`;
}

// Function to send an email to the user via SendGrid (replace with actual SendGrid integration)
async function sendEmailToUser(userEmail, invoice) {
    // Replace with your SendGrid API key and configuration
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

    const msg = {
        to: userEmail,
        from: 'panditanuj193@email.com',
        subject: 'Invoice for Your Donation',
        text: invoice,
        html: `<p>${invoice}</p>`,
    };

    await sgMail.send(msg);
}

// Function to check if a string is numeric
function isNumeric(input) {
    return /^\d+$/.test(input);
}

// Function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to display an error message
function displayErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;

    // Remove any existing error messages
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    // Insert the error message above the form
    const form = document.getElementById('paymentForm');
    form.parentNode.insertBefore(errorDiv, form);
}
