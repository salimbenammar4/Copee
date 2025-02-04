# CopeeApp

CopeeApp is a mobile application developed with **React Native** and **Firebase**. It allows users to access services and information related to energy-saving solutions offered by **COPEE**.

## Features

### Client

- Create an account  
- Log in  
- Reset password  
- View news about energy-saving solutions  
- Browse installations provided by COPEE  
- Check available services  
- Test eligibility for deploying energy-saving equipment  
- Once eligible, generate an equipment installation request  
- Real-time chat with staff  
- Submit feedback  

### Staff

- Log in  
- Manage installation requests  
- View client feedback  
- Chat with clients  

### Administrator

- Log in  
- Manage users  
- Chat with clients  

---

## Instructions to Deploy the Project on Another Computer

### Prerequisites

- Node.js (version 10 or later)  
- npm  
- Git  
- ExpoGo (on your smartphone)  
- A Firebase account with a created project  

### Steps

1. Clone the GitHub repository:  
    ```bash
    git clone https://github.com/salimbenammar4/Copee.git
    ```

2. Access the project directory:  
    ```bash
    cd CopeeApp
    ```

3. Install dependencies with npm:  
    ```bash
    npm install
    ```

4. Configure Firebase:  
    Set up the `firebase.js` file with your Firebase configuration details.  

    Example:  
    ```javascript
    export default {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```
