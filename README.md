# TravelToor

TravelToor is a modern travel booking platform designed to simplify the travel planning process. Whether you're booking a vacation package or managing your travel profile, TravelToor provides a user-friendly interface and all the features you need to make your travel experience smooth and enjoyable.

## Hosted URL

Visit the next generation amazing TravelToor project: [Check it out here](https://travel-ticket-backend.onrender.com)!

## Features Implemented

- ### Login / Register / Display Users:

        1. /api/user/login : Checks whether the user exists or not and act accordingly

        2. /api/user/register : Creates the user with the given email and strong password check.

        3. /api/user/details : Returns the user details of the desired user using token.

- ### Package & Package-Details Pages:

        1. /api/package/listings : Display all the listings present in the database.

        2. /api/package/details/:id : Display the desired listing with the package Id from database.

        3. /api/package/filter : Display all the desired listings user searched with location filter.

- ### Order verification / display & CheckOut Page:

        1. /api/checkout/payment : Redirects to the STRIPE PAYMENT GATEWAY and passess
                                   through a middleware to validate user token with the
                                   necessary order details.

        2. /api/checkout/verify : Verify the payment whether succeeded or failed using url parameters.

        3. /api/checkout/booked : Display all the orders of the desired user using userId
                                  and passess through a middleware to validate user token.

        4. /api/checkout/promovalidate : Checks whether the user is using the correct or
                                         reused promoCode for the discount feature and
                                         passess through a middleware to validate user token.

### Other Features

- ### Newsletter:

        1. /api/subscribe : Uses NODEMAILER and sends the subscription mail to the desired
                            user's email address.

- ### Logout / Login Features :
        1. /api/verifytoken : Checks the user token and helps in navigating the logout
                              login features using boolean "LoggedIn" toggling between
                              true or false as required.

## Technologies Used

- EXPRESS.JS, NODE,JS, MONGO-DB

- BCRYPT, VALIDATOR, CORS, JWT

- JAVASCRIPT

- STRIPE PAYMENT GATEWAY

- JS PDF, NODEMAILER

## Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/TravelToorFrontend.git
   cd TravelToorFrontend
   ```

2. ### Install Dependencies

```bash
npm install
```

### or

```bash
yarn install
```

3. ### Running the Application

```bash
nodemon server.js
```

4. ### Your app will be available at http://localhost:4000.

### Instructions for Customizing

- Replace `https://github.com/yourusername/TravelToorBackend.git` with the actual URL of your repository.
- If there are additional features or specifics, adjust the instructions accordingly.
- Ensure you have a `LICENSE` file if you're mentioning licensing in the `README.md`.

This `README.md` should provide a clear and comprehensive guide to setting up and using your application.

### Feel free to open an issue or submit a pull request if you have suggestions or improvements

## Team Members

- AKASH TRIPATHI 2023IMG-005

- TUSHAR TIWARI 2023IMG-050

- NIHARIKA SAXENA 2023IMT-052
