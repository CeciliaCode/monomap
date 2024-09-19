---

# Monkeypox Case Management API

![Monomap](https://github.com/user-attachments/assets/8e4eafc6-13a2-4f80-b6e9-68873c92ec2d)

This project provides a fully functional RESTful API for managing Monkeypox cases. It supports full CRUD operations for creating, reading, updating, and deleting case records, as well as querying cases from the last 7 days. The API is containerized using Docker for easy setup and deployment.

## Table of Contents

- [Features](#features)
- [Used Technologies](#used-technologies)
- [Prerequisites](#prerequisites)
- [Setup and Basic, Quickstart Personalization](#setup-and-basic-quickstart-personalization)
  - [Step 1: Update Environment Variables](#step-1-update-environment-variables)
  - [Step 2: Restart the Application](#step-2-restart-the-application)
- [Running the Application](#running-the-application)
- [Testing the API Using Postman](#testing-the-api-using-postman)
- [Testing MongoDB with MongoDB Compass (Docker Setup)](#testing-mongodb-with-mongodb-compass)
- [CI/CD Pipeline personalization](#ci-cd-pipeline-personalization)
  - [Step 1: Update Docker Compose File](#step-1-update-docker-compose-file)
  - [Step 2: Personalize the Database Name](#step-2-personalize-the-database-name)
  - [Step 3: Personalize the GitHub Actions Workflow](#step-3-personalize-the-github-actions-workflow)
- [Running with Docker (Advanced)](#running-with-docker-advanced)
- [Appendix: Creating Secrets and Access Tokens](#appendix-creating-secrets-and-access-tokens)
  - [1. Creating Application Access Tokens for Gmail](#1-creating-application-access-tokens-for-gmail)
  - [2. Creating Application Access Tokens in DockerHub](#2-creating-application-access-tokens-in-dockerhub)
- [Notes](#notes)

---

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

**Basic:**

- **Docker Desktop**: Make sure Docker Desktop is installed. You can download and install it from [here](https://www.docker.com/products/docker-desktop).
- **Postman**: Install Postman to test the API endpoints. You can download it from [here](https://www.postman.com/downloads/).

**Complementary:**

- **MongoDB Compass**: Install MongoDB Compass if you wish a visual interface to interact with MongoDB. [Download MongoDB Compass](https://www.mongodb.com/try/download/compass).
- **Node.js**: Ensure Node.js is installed if you want to develop locally. [Download Node.js](https://nodejs.org/). 

## Setup and Basic, Quickstart Personalization

### Step 1: Clone the Repository

   ```bash
   git clone https://github.com/yourusername/monomap.git
   cd monomap
   ```

Before running the application, you must set up your environment variables in the `.env` file. This step is crucial to avoid errors during the execution of the application.

### Step 2: Update Environment Variables

1. **Create the `.env` file based on the template**:
   - The project includes a sample `.env.template` file that stores essential environment variables. You must fill in the required values before running the application.

2. **Modify the following values with your own credentials**:
   - `PORT`: Port for the application (e.g., `3000`).
   - `MONGO_URL`: MongoDB connection string for local development.
   - `MONGO_URL_DOCKER`: MongoDB connection string when running inside Docker.
   - `MAIL_SECRET_KEY`: Your email service secret key, especially for Gmail (app-specific password).
   - `MAIL_SERVICE`: The mail service you are using (e.g., Gmail).
   - `MAIL_USER`: Your email address for sending notifications.
   - `MAPBOX_ACCESS_TOKEN`: Your Mapbox access token for geolocation services.

   **Example `.env` file**:

   ```plaintext
   PORT=3000
   MONGO_URL=mongodb://root:example@localhost:27017/
   MONGO_URL_DOCKER=mongodb://root:example@mongo
   MAIL_SECRET_KEY=your_secret_key_here
   MAIL_SERVICE=gmail
   MAIL_USER=your_email@example.com
   MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```

3. **Save the `.env` file** and ensure all fields are correctly filled out.

### Step 3: Restart the Application (if needed)

After updating the environment variables, you need to restart the Docker containers to apply the changes:

- Stop the running containers with:
  ```bash
  docker-compose down
  ```
- Start the containers again:
  ```bash
  docker-compose up
  ```

## Running the Application

Once you have personalized your `.env` file and ensured Docker Desktop is running, you can:

- **Run the Application with Docker**:

   ```bash
   docker-compose up
   ```

   This command will build and start the API inside a Docker container.

- **Stop the Docker Containers**:
  - To stop the running containers, press **CTRL + C** in the terminal.
  - Alternatively, stop and remove the containers with:

    ```bash
    docker-compose down
    ```

## Testing the API Using Postman

Once Docker is up and running, the API will be available at [http://localhost:3000](http://localhost:3000). You can test the API using Postman with the following routes:

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
     
---

## Testing MongoDB with MongoDB Compass

1. **Open MongoDB Compass**.

2. **Connect to MongoDB** using the connection string configured for Docker. Use the `MONGO_URL_DOCKER` value specified in your `.env` file. A common example would be:

   ```plaintext
   mongodb://root:example@mongo:27017/
   ```

   Ensure that:
   - `root` is the username.
   - `example` is the password.
   - `mongo` is the hostname of the MongoDB service defined in your `docker-compose.yml` file.
   - `27017` is the default MongoDB port.

3. **Click "Connect"**: After entering the connection string, click the "Connect" button to establish a connection with your Dockerized MongoDB instance.

4. **Browse the Database**:
   - Once connected, you will see a list of available databases inside the Dockerized MongoDB instance.
   - Select the database used by your application (e.g., `monomap`).

5. **View Collections**:
   - Explore the collections within the database, such as those storing Monkeypox case data.
   - Click on the collection name to view documents, and use the built-in query interface to filter or search specific records.

6. **Inspect and Manage Data**:
   - View, edit, or delete documents directly from MongoDB Compass to validate that your API is correctly interacting with the database.
   - For example, run a query to find all Monkeypox cases or filter data based on certain criteria, such as by `age` or `location`.

---

## CI/CD Pipeline personalization

The project uses GitHub Actions for CI/CD, automatically building and pushing Docker images to Docker Hub on every push to the main branch. This workflow is flexible and can be tailored to another credentials or container registries.

**Make sure to update user and image routes (in lowercase)** within the GitHub Actions workflow files: `.github/workflows/publish.yml` for DockerHub and `.github/workflows/publishforgit.yml` for GitHub packages. Specifically, adjust the `build` and `push` steps as per your project needs. Additionally, ensure `GITHUB_TOKEN` has read & write permissions under **Settings > Actions > General** in your GitHub repository.

### Example Workflow Configuration:

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
      - name: Clone repository using GitHub Actions
        uses: actions/checkout@v3
      
      - name: Log in to Docker Hub  
        run: echo "${{ secrets.DOCKER_PAT }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

      - name: Build Docker Image and tag it with both the commit SHA and latest
        run: docker build -t yourdockerhubusername/yourimagename:latest .

      - name: Tag Latest
        run: docker tag yourdockerhubusername/yourimagename:latest yourdockerhubusername/yourimagename:latest

      - name: Push the image to Docker Hub
        run: |
          docker push yourdockerhubusername/yourimagename:latest -> A [route].
```

### Detailed Workflow Steps:

1. **Clone repository using GitHub Actions**:
   - This step uses the `actions/checkout@v3` action to clone your repository into the workflow environment, ensuring the latest code is ready for the build process.

2. **Log in to Docker Hub using credentials stored in GitHub Secrets (`DOCKER_USERNAME` and `DOCKER_PAT`)**:
   - This step securely logs into Docker Hub using the credentials stored in GitHub Secrets. Make sure you have added these secrets in your GitHub repository settings under **Settings > Secrets and variables > Actions**.

3. **Build Docker image and tag it with both the commit SHA and `latest`**:
   - This step builds the Docker image from the Dockerfile and tags it twice: once with the commit SHA (for version tracking) and once as `latest`.

4. **Push the image to Docker Hub**:
   - This final step pushes the tagged Docker images to your Docker Hub repository, making them available for deployment.

### GitHub Actions Secrets

- `DOCKER_USERNAME`: Your Docker Hub username.
- `DOCKER_PAT`: Your Docker Personal Access Token (PAT).

---

### Running with Docker (Advanced)

If you're familiar with Docker and want to build and run the API manually, follow these steps:

1. **Build Docker image**:

   ```bash
   docker build -t [route]:latest
   ```

2. **Run Docker container**:

   ```bash
   docker run -p 3000:3000 [route]:latest
   ```

3. **Access the API**:

   Open [http://localhost:3000](http://localhost:3000) in your browser or use Postman to test the endpoints.

   - You can also manage and stop containers using the Docker Desktop GUI.

---

## Appendix: Creating Secrets and Access Tokens

Follow these steps to securely store secrets such as API keys and access tokens:

### 1. Creating Application Access Tokens for Gmail

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

### 2. Creating Application Access Tokens in DockerHub

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

---

## Notes

**First note**: The quickstart will make e-mail sending and CRUD operations functional, should a previously created database with matching names (unless personalized) exist, or the code shall automatically generate it; but the GitHub workflow won't be triggered if the cloned repository, and routes are not updated withing the .yml files.

**Second note**: This reusable project for any disease has the potential to be further improved by incorporating additional parameters into the model, such as symptoms, hospital classification, or blood type, which would enhance its utility for research. Additionally, creating a frontend GUI or a dashboard to analyze and visualize infection trends could provide valuable insights. An extra feature to resend emails when a case is updated can also be implemented, perfecting notification processes and case monitoring.

**Third note**: Console logs, error messages, and the HTML e-mail template include Spanish writing.

---
