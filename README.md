# Utility Bill Management System

[**Utility Bill Management System**]

## Live Site URL: https://ubms-rabbi.netlify.app/

## Github Repo link (Server-side):
https://github.com/rabbi007/Utility-Bill-Management-Server.git 

## Github Repo link (Client-side): 
https://github.com/rabbi007/Utility-Bill-Management-Client.git

## Purpose of Website
The **Utility Bill Management System** is a web application that helps users manage and pay their utility bills, including **Electricity**, **Gas**, **Water**, and **Internet**. The system allows users to view their bills, make payments, download reports in PDF format, and more. It is designed to provide a seamless and user-friendly experience for managing utility services online.

## Key Features
- **User Authentication**: Secure login and registration using **Firebase Authentication** with options for **Google login** and **email/password** authentication.
- **Bill Management**: View, manage, and pay utility bills (Electricity, Gas, Water, Internet). Users can see detailed information about each bill, including amount, due date, and location.
- **Real-Time Bill Updates**: Users can pay their bills and update their payment status in real-time.
- **Responsive Design**: Fully responsive design optimized for **mobile**, **tablet**, and **desktop**.
- **PDF Report Download**: Users can download a PDF report of their paid bills, containing details such as **username**, **email**, **amount**, **address**, **phone**, **date**, and **payment status**.
- **Dynamic Page Titles**: Each page has a dynamic title using a custom hook **`useDocumentTitle`**, which can be found in the 'Hook' folder of the project.

## NPM Packages Used:
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for building modern UIs.
- **Firebase**: Authentication and backend services.
- **Axios**: HTTP client for making requests.
- **jsPDF**: Library to generate PDF documents.
- **jsPDF-AutoTable**: Plugin for creating tables in PDFs.
- **React Router**: Used for client-side routing.
- **React Spinners**: Loading spinners to indicate async operations.
- **React Icons**: For scalable icons.
- **React Toastify**: For showing toast notifications.
- **SweetAlert2**: For handling user confirmation popups and alerts.
- **Swiper**: For creating image sliders/carousels.
- **DaisyUI**: Tailwind CSS plugin for ready-made components.

- Run the Project Locally

To run this project on your local machine, follow these steps:

1. Clone the Repositories

Clone both the client-side and server-side repositories to your local machine.

git clone https://github.com/rabbi007/Utility-Bill-Management-Client.git

git clone https://github.com/rabbi007/Utility-Bill-Management-Server.git

2. For Client-side:

cd Utility-Bill-Management-Client
npm install

For Server-side:

cd Utility-Bill-Management-Server
npm install

3. Set Up Firebase

- Create a project in Firebase

Set up Authentication and get your Firebase credentials (API keys).

Add the Firebase credentials to your project’s firebaseConfig.js file in both the client-side and server-side projects.

4. Run the Server

Start the server-side by running:

cd Utility-Bill-Management-Server
npm start

5. Run the Client

In a separate terminal window, start the client-side:

cd Utility-Bill-Management-Client
npm start


The client-side application should now be accessible at http://localhost:5173/, 

and the server-side should be running on http://localhost:3000/

Notes

Ensure you have Node.js and npm installed on your machine.

Make sure to set up the Firebase project with proper authentication and rules.

If you run into any issues, feel free to open an issue on the respective repositories.

### Writer:- 
Name:   Khandaker Reza-e-Rabbi;
Email:  rabbi@live.com;
Github: https://github.com/rabbi007;


