# LegalNexus-Frontend
LegalNexus Frontend is here ....


Detailed Report: Frontend Features Implemented
Here is a comprehensive overview of the frontend features implemented so far, aligned with the backend functionalities and best practices:

1. User Signup
Purpose:
Enables users to register on the system with role-specific fields. Handles validation, dynamic form rendering, and interaction with the backend.

Features:
Dynamic Role-Based Fields:
If Civilian is selected, the form displays a userId field.
For roles such as Judge, Lawyer, and Police, the form displays an employeeId field instead.
Backend Integration:
Sends a POST request to http://localhost:3000/api/v1/user/signup with form data.
Handles server-side errors like duplicate user and unverified employee ID gracefully.
Flash Messages:
Displays success messages (e.g., "OTP sent to the registered phone number").
Shows error messages for backend validation failures.
Outcome:
Provides a user-friendly and role-specific registration experience.

2. OTP Verification
Purpose:
Verifies the user's account by validating the OTP sent to their registered phone number.

Features:
OTP Submission:
Accepts a 6-digit OTP and sends it to http://localhost:3000/api/v1/user/verify-otp.
Redirects the user to the dashboard upon success.
Displays error messages for invalid or expired OTPs.
Countdown Timer:
A 60-second countdown timer starts when the page loads.
After the timer expires, a "Resend OTP" button appears.
Resend OTP:
Sends a new OTP via a POST request to the signup endpoint.
Displays a success message when the OTP is resent.
Outcome:
Ensures secure and seamless user verification while maintaining usability.

3. User Login
Purpose:
Authenticates users based on their role, identifier (userId or employeeId), and password.

Features:
Role-Based Identifier Input:
Dynamically displays either userId or employeeId based on the selected role.
Backend Integration:
Sends a POST request to http://localhost:3000/api/v1/user/signin with role, identifier, and password.
Stores the JWT token upon successful login and redirects to the dashboard.
Error Handling:
Displays backend-provided error messages such as:
"Invalid user" for unregistered identifiers.
"User is not verified with OTP" for accounts pending verification.
"Invalid credentials" for incorrect password or role mismatch.
Flash Messages:
Provides real-time feedback for both success and error cases.
Outcome:
Ensures a robust and user-friendly authentication mechanism.

4. Forgot Password
Purpose:
Allows registered users to reset their password if they forget it, using a reset code sent to their registered phone number.

Features:
Forgot Password Form:
Prompts the user for their registered phone number.
Sends a POST request to http://localhost:3000/api/v1/user/forgot-password/request-reset.
Handles errors like unregistered phone numbers and OTP sending failures.
Flash Messages:
Displays success messages (e.g., "Reset code sent to the registered mobile number").
Shows error messages for invalid phone numbers or backend failures.
Outcome:
Provides a secure mechanism for requesting password resets.

5. Reset Password
Purpose:
Allows users to reset their password using the reset code sent to their phone and a new password.

Features:
Reset Password Form:
Prompts for the reset code and a new password.
Sends a POST request to http://localhost:3000/api/v1/user/forgot-password/reset.
Handles server-side validation for OTP expiration, invalid codes, and password requirements.
Countdown Timer:
A 120-second timer for OTP expiration.
Displays a "Resend Reset Code" button when the timer expires.
Resend OTP:
Sends a new reset code via the "Resend Reset Code" button.
Displays success messages when the reset code is resent.
Outcome:
Ensures a secure and user-friendly password reset process.

6. Flash Message System
Purpose:
Provides real-time feedback for all user interactions, including success and error messages.

Features:
Dynamic Styling:
Green background for success messages.
Red background for error messages.
Positioning and Animation:
Positioned at the top-right corner of the screen.
Uses smooth animations for appearance (slideDown) and disappearance (fadeOut after 4.5 seconds).
Reusable Component:
Easily integrated into any page or feature.
Outcome:
Enhances the user experience with clear and visually appealing notifications.

7. Routing and Navigation
Purpose:
Ensures seamless navigation across different pages and features.

Routes Implemented:
/signup: User Signup
/verify-otp: OTP Verification
/login: User Login
/forgot-password: Forgot Password
/password-reset: Reset Password
/dashboard: Dashboard (placeholder for future implementation)
Outcome:
Provides a structured and intuitive navigation system for the application.