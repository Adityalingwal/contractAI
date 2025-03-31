# AI-Powered Contractor Hiring & Payments

<img src="./packages/./client/images/Screenshot 2025-03-30 185108.png" width="800" alt="Project Logo">

## Overview
AI-Powered Contractor Hiring & Payments is an intelligent platform that connects businesses with skilled contractors. It streamlines the hiring process, contract management, and payments, all in one seamless experience.

## Features
- **Dashboard Selector**: Choose between Business and Contractor Dashboards.
- **Business Dashboard**: Manage contracts, find contractors, and track payments.
- **Contractor Dashboard**: View job postings, apply for gigs, and track payment status.
- **Find Contractors**: AI-powered search to discover the best professionals.
- **Post a Contract**: Businesses can create job listings.
- **Notifications**: Stay updated with real-time alerts.
- **Apply for Gigs**: Contractors can bid on available contracts.
- **Edit Profile**: Update professional details and preferences.
- **My Contracts**: Track active and past contracts.
- **Payment Status**: Monitor payment transactions securely.



## Contributing And Project Setup
```bash
# Clone the repository
git clone https://github.com/Adityalingwal/contractAI.git

# Navigate to the packages directory
cd packages

#Go to the client directory to start the client
cd client 
npm install 
npm start

#Go to the server directory
cd server 
npm install 
npm start

# Create an .env file in server directory
   DB_HOST= Your_host
   DB_PORT= Your_port
   DB_NAME= Your_name
   DB_USER= Your_user
   DB_PASSWORD= Your_password
   PAYMAN_API_SECRET= Your_api
   NODE_ENV= Your_env

## Usage
1. Register or log in as a **Business** or **Contractor**.
2. Businesses can post contracts and manage payments.
3. Contractors can apply for gigs and track job status.
4. Use the dashboard for contract management.

## Technologies Used
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Payment API**: PaymanAI
- **AI Model**: OpenAI for contractor recommendations

## Contact
For inquiries, please reach out at : [sanulingwal1@gmail.com](mailto:sanulingwal1@gmail.com).
