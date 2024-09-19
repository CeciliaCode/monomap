# Monkeypox Case Management API

This project provides a fully functional RESTful API for managing Monkeypox cases. It supports full CRUD operations for creating, reading, updating, and deleting case records, as well as querying cases from the last 7 days. The API is containerized using Docker for easy setup and deployment.

## Table of Contents

- [Features](#features)
- [Used Technologies](#used-technologies)
- [Prerequisites](#prerequisites)
- [Quick Start: Non-Personalized Execution](#quick-start-non-personalized-execution)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Run the Application with Docker](#step-2-run-the-application-with-docker)
  - [Step 3: Test the API Using Postman](#step-3-test-the-api-using-postman)
  - [Postman Routes and Examples](#postman-routes-and-examples)
  - [Testing MongoDB with MongoDB Compass](#testing-mongodb-with-mongodb-compass)
- [Personalizing the Setup](#personalizing-the-setup)
  - [Step 1: Update Environment Variables](#step-1-update-environment-variables)
  - [Step 2: Update Docker Compose File](#step-2-update-docker-compose-file)
  - [Step 3: Personalize the Database Name](#step-3-personalize-the-database-name)
- [CI/CD Pipeline](#ci-cd-pipeline)
  - [GitHub Actions Workflow](#github-actions-workflow)
  - [Steps](#steps)
  - [GitHub Actions Secrets](#github-actions-secrets)
- [Running with Docker (Advanced)](#running-with-docker-advanced)
- [Appendix: Creating Secrets and Access Tokens](#appendix-creating-secrets-and-access-tokens)
  - [1. Creating Secrets in GitHub Repositories](#1-creating-secrets-in-github-repositories)
  - [2. Creating Application Access Tokens for Gmail](#2-creating-application-access-tokens-for-gmail)
  - [3. Creating Application Access Tokens in DockerHub](#3-creating-application-access-tokens-in-dockerhub)
- [Notes](#notes)

## Features

- **CRUD Operations**:
  - **Create**: Register new Monkeypox cases with attributes like latitude, longitude, gender, and age.
  - **Read**: Fetch all cases or filter based on criteria (e.g., cases from the last 7 days).
  - **Update**: Modify case details.
  - **Delete**: Remove case records.
  
- **Recent Cases Query**: Retrieve Monkeypox cases registered in the last week.
  
- **Dockerized**: The API runs inside a Docker container for easy testing and deployment.

## Used Technologies

- **Docker**: Containerization for scalable deployment.
- **Express.js**: Framework for creating RESTful routes and managing HTTP requests.
- **GitHub Actions**: CI/CD pipeline for automated Docker image builds and deployments.
- **MongoDB**: Database for storing case data, including geolocation and patient details.
- **Node.js**: Backend for the API.
- **TypeScript**: Provides type safety and code quality for better development.

## Prerequisites

- **Docker Desktop**: Make sure Docker Desktop is installed. You can download and install it from [here](https://www.docker.com/products/docker-desktop).
- **MongoDB Compass**: You can install MongoDB Compass for a visual interface to interact with MongoDB. [Download MongoDB Compass](https://www.mongodb.com/try/download/compass).
- **Node.js**: Ensure that Node.js is installed if you want to develop locally. [Download Node.js](https://nodejs.org/).
- **Postman**: Install Postman to test the API endpoints. You can download it from [here](https://www.postman.com/downloads/).

---

## Quick Start: Non-Personalized Execution

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/monomap.git
cd monomap
```

### Step 2: Run the Application with Docker

Once Docker Desktop is installed and running, open the terminal inside the project directory (e.g., using Visual Studio Code's integrated terminal) and run:

```bash
docker-compose up
```

This command will build and start the API inside a Docker container.

- **Stopping the Docker Containers**:
  - To stop the running containers, press **CTRL + C** in the terminal where Docker is running.
  - You can also stop and remove the containers with the following commands:

    ```bash
    docker-compose down
    ```

  - Alternatively, you can use the Docker Desktop GUI to manage and stop the containers visually.

### Step 3: Test the API Using Postman

Once Docker is up and running, the API will be available at [http://localhost:3000](http://localhost:3000). You can test the API using Postman. Here are the routes and examples you can use for testing:

### Postman Routes and Examples

1. **Create a New Case**:
   - **Method**: `POST`
   - **URL**: `http://localhost:3000/cases`
   - **Body**: (raw JSON)

     ```json
     {
       "lat": 19.432608,
       "lng": -99.133209,
       "genre": "Male",
       "age": 25
     }
     ```

2. **Get All Cases**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/cases`

3. **Get a Case by ID**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/cases/:id`
   - Replace `:id` with the actual case ID you want to fetch.

4. **Update a Case**:
   - **Method**: `PUT`
   - **URL**: `http://localhost:3000/cases/:id`
   - **Body**: (raw JSON)

     ```json
     {
       "lat": 19.432608,
       "lng": -99.133209,
       "genre": "Female",
       "age": 30
     }
     ```

5. **Delete a Case**:
   - **Method**: `DELETE`
   - **URL**: `http://localhost:3000/cases/:id`
   - Replace `:id` with the actual case ID you want to delete.

6. **Get Cases from the Last Week**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/cases/last`

### Testing MongoDB with MongoDB Compass

You can use **MongoDB Compass** to visually inspect and interact with the database. Once Docker is running and MongoDB is started, follow these steps:

1. **Open MongoDB Compass**.
2. **Connect to MongoDB** by entering the following URL:

   ```plaintext
   mongodb://root:example@localhost:27017/
   ```

3. **Browse the data** and interact with the collections to visualize and query the Monkeypox case data.

---

## Personalizing the Setup

If you want to personalize the project by using your own MongoDB, Mail service, and Mapbox token, follow these steps:

### Step 1: Update Environment Variables

1. **Open `.env` file**:
   - The project includes a `.env` file that stores environment variables.
   
2. **Modify the following values with your own credentials**:
   - `MONGO_URL`: MongoDB connection string.
   - `MAIL_SECRET_KEY`: Your Gmail app password for email service.
   - `MAIL_SERVICE`: The mail service you're using (e.g., Gmail, SendGrid).
   - `MAIL_USER`: Your email address for sending notifications.
   - `MAPBOX_ACCESS_TOKEN`: Your Mapbox access token for geolocation services.

   **Example `.env` file**:

   ```plaintext
   PORT=3000
   MONGO_URL=mongodb://<your-mongo-username>:<your-password>@localhost:27017/
   MAIL_SECRET_KEY=<your-gmail-app-password>
   MAIL_SERVICE=gmail
   MAIL_USER=<your-email-address>
   MAPBOX_ACCESS_TOKEN=<your-mapbox-token>
   ```

3. **Save the file** and restart the application using `docker-compose up` to apply the changes.

### Step 2: Update Docker Compose File

1. Open the `docker-compose.yml` file.
2. Replace the default image (`ceciliasw/monomap:latest`) with your own Docker Hub username and image:

   ```yaml
   services:
     monomap:
       image: yourdockerhubusername/yourimagename:latest
   ```

3. Save the file and re-run `docker-compose up` to apply these changes.

### Step 3: Personalize the Database Name

1. Open the `App.ts` file (or `index.ts`, depending on your structure).
2. Look for the following code in the `App.ts` file:

   ```typescript
   import express from 'express';
   import 'dotenv/config';
   import { envs } from './config/envs.plugin';
   import { MongoDatabase } from './data/init';
   import { AppRoutes } from './controllers/routes';
   import { emailJob } from './domain/jobs/email.job';

   const app = express();
   app.use(express.json());
   app.use(AppRoutes.routes);

   (async () => {
     await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL ?? "", dbName: "MonoMap" });  // Change "MonoMap" here
   })();

   app.listen(envs.PORT, () => {
     console.log("Server started.");
     emailJob();
   });
   ```

3. **Update the `dbName`** from `"MonoMap"` to the name you want for your database.

4. Save the file and restart the app using Docker.

---

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD, automatically building and pushing Docker images to Docker Hub on every push to the `main` branch.

### GitHub Actions Workflow

Make sure you update the image name in the GitHub Actions workflow file (`.github/workflows/publish.yml` or `.github/workflows/publishforgit.yml` for packages - GITHUB_TOKEN is automatically generated), specifically in the `build` and `push` steps.

### Example:

```yaml
name: Docker Build & Publish

on: 
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Clone code
        uses: actions/checkout@v3
      
      - name: Login to Docker Hub  
        run: echo "${{ secrets.DOCKER_PAT }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

      - name: Build Docker Image
        run: docker build -t yourdockerhubusername/yourimagename:latest .

      - name: Tag Latest
        run: docker tag yourdockerhubusername/yourimagename:latest yourdockerhubusername/yourimagename:latest

      - name: Push Docker Image
        run: |
          docker push yourdockerhubusername/yourimagename:latest
```

### Steps



1. **Clone repository using GitHub Actions**.
2. **Log in to Docker Hub** using credentials stored in GitHub Secrets (`DOCKER_USERNAME` and `DOCKER_PAT`).
3. **Build Docker image** and tag it with both the commit SHA and `latest`.
4. **Push the image** to Docker Hub.

### GitHub Actions Secrets

- `DOCKER_USERNAME`: Your Docker Hub username.
- `DOCKER_PAT`: Your Docker Personal Access Token (PAT).

---

## Running with Docker (Advanced)

If you're familiar with Docker and want to build and run the API manually:

1. **Build Docker image**:

   ```bash
   docker build -t yourdockerhubusername/yourimagename:latest .
   ```

2. **Run Docker container**:

   ```bash
   docker run -p 3000:3000 yourdockerhubusername/yourimagename:latest
   ```

3. **Access the API**:

   Open [http://localhost:3000](http://localhost:3000) in your browser or use Postman to test the endpoints.

4. **Stopping the Docker Containers**:
   - You can stop the container by pressing **CTRL + C** in the terminal or using the following command:

     ```bash
     docker stop $(docker ps -q --filter ancestor=yourdockerhubusername/yourimagename:latest)
     ```

   - You can also manage and stop containers using the Docker Desktop GUI.

---

## Appendix: Creating Secrets and Access Tokens

### 1. Creating Secrets in GitHub Repositories

GitHub secrets are used to store sensitive information (like API keys or access tokens) securely in your repository. Here's how to create secrets in GitHub:

#### Step-by-Step:

1. **Go to your GitHub repository**.
2. Click on the **Settings** tab.
3. On the left-hand menu, click on **Secrets and variables** and then select **Actions**.
4. Click the **New repository secret** button.
5. Enter the name of the secret, for example, `DOCKER_USERNAME` or `DOCKER_PAT`.
6. Paste the sensitive value (e.g., token or password) in the **Value** field.
7. Click **Add secret**.

Now, the secret can be accessed within your GitHub Actions workflows using the format `${{ secrets.SECRET_NAME }}`.

---

### 2. Creating Application Access Tokens for Gmail

To use Gmail for sending emails from your API, you need to create an **App Password** (a secure way for Gmail API access when two-factor authentication is enabled).

#### Step-by-Step:

1. **Go to your Google Account** and ensure two-factor authentication (2FA) is enabled.
2. **Navigate to Security** in the left-hand panel.
3. Scroll down to the **Signing in to Google** section and click on **App passwords**.
4. **Sign in** to your Google account if prompted.
5. Under the **Select the app and device you want to generate the app password for**, select **Mail** as the app and **Other** for device, then name it (e.g., "Node API").
6. Click **Generate**.
7. **Copy the generated password**. This will serve as your `MAIL_SECRET_KEY`.

---

### 3. Creating Application Access Tokens in DockerHub

DockerHub tokens are used to authenticate and push Docker images programmatically without exposing your Docker password. You need to provide **Read, Write, and Delete** permissions to the token.

#### Step-by-Step:

1. **Log in to DockerHub**.
2. Click on your profile icon in the top right and select **Account Settings**.
3. In the left-hand menu, click **Security**.
4. Under **Access Tokens**, click **New Access Token**.
5. Name the token (e.g., "GitHub Actions CI").
6. Select the scope as **Read, Write, and Delete**.
7. Click **Generate**.
8. Copy the token and store it in your GitHub repository secrets as `DOCKER_PAT`.


## Notes

---

**First note**: The quick, unpersonalized start will make the CRUD operations functional, should a previously created database with matching names exist, or the code shall automatically generate it; but the GitHub workflow won't be triggered if a repository is not created, nor will the sent emails be accessible unless the application is personalized, especially by configuring the `.env` variables:

- `MAIL_SECRET_KEY=`
- `MAIL_SERVICE=`
- `MAIL_USER=`

---

**Second note**: This reusable project for any disease has the potential to be further improved by incorporating additional parameters into the model, such as symptoms, hospital classification, or blood type, which would enhance its utility for research. Additionally, creating a frontend GUI, or a dashboard to analyze and visualize infection trends could provide valuable insights. An extra feature to resend emails when a case is updated can also be implemented, perfectionating notification processes and case monitoring.

---

**Third note**: Console logs, error messages, and the HTML e-mail template include spanish writing.
