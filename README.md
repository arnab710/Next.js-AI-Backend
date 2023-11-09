# Next.js 13/14 AI-Enabled Backend API Documentation

## Introduction

**Welcome to the documentation for our Next.js Backend API**. This guide details the creation and implementation of an API route handler within a Next.js environment, focusing on versions 13 and 14.

Our primary goal is to interface with advanced AI models, specifically `OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5`, to facilitate real-time, streamed responses to user interactions. This backend is designed to process user conversations seamlessly, leveraging the AI model to generate dynamic responses, which are streamed directly to ensure a responsive user experience.

The system is optimized for efficient integration with frontend applications, providing a robust, real-time conversational interface.

## Workflow

### 1. Utilizing APP Router in Next.js 13/14

Next.js versions 13 and 14 introduce an interaction model with the APP router, distinct from the traditional page router used in Next.js 12. This new model significantly simplifies the creation of route handlers directly within the `APP` directory.

### 2. Creating Route Handlers

- **API Directory Structure:**

  - Within the `src` directory of your Next.js application, navigate to the `APP` directory.
  - Here, create a dedicated `API` directory. This will be the container for your API route handlers.

- **Defining Route Handlers:**

  - Inside the `API` directory, create a file named `route.ts` (or `route.js` if you're using JavaScript).
  - This filename is recognized by Next.js as a route handler. It's essential to use this specific naming convention for Next.js to correctly identify and handle the route.
  - For detailed information on route handler naming and structure, refer to the official Next.js documentation on [Routing & Colocation](https://nextjs.org/docs/app/building-your-application/routing#colocation).

- **Accessing the API Endpoint:**
  - The structure of your folders and files within the `API` directory directly corresponds to the URL path of your API endpoint.
  - For example, if you place your `route.ts` file within a folder path like `api/response`, your API endpoint will be accessible at the same path (e.g., `/api/response`).

### 3. Implementing the POST Request Handler

- **Single-Route Configuration:**
  - Set up a POST request handler within your route file (`route.ts` or `route.js`). This handler is the core of your API's functionality.
- **Workflow of the Handler:**

  - The handler is designed to perform multiple key operations in a single route:
    1. **Receiving User Messages:** It starts by accepting messages from the user sent from the client side.
    2. **Communication with AI Model:** The received user input is then forwarded to the AI model (`OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5`).
    3. **Handling Streamed Responses:** The AI model processes the input and sends back a streamed response.
    4. **Relaying Response to Client:** Finally, this streamed response is sent back to the client, completing the interaction loop.

- **Efficiency and Performance:**
  - This consolidated approach in a single route ensures efficient handling of requests and responses, providing a seamless user experience.

#### Detailed Breakdown of `route.ts`

This file is the heart of our backend API, handling the interaction between the frontend, the AI model, and the client.

#### POST Route Screenshot for Reference

![Screenshot 2023-11-10 034727](https://github.com/arnab710/Next.js-AI-Backend/assets/107277776/e39221fb-f09f-4e96-aa22-18c4873ea3c9)

- **Hugging Face Inference Instance:**

  - An instance of `HfInference` is created using the Hugging Face API key, facilitating communication with the AI model.

- **Setting the Runtime Environment:**

  - The runtime for the route is set to "edge" for optimal performance.

- **POST Request Handler:**

  - The main function handling POST requests, responsible for processing user input and interacting with the AI model.

- **Extracting User Prompt:**

  - The user's prompt is extracted from the request body and validated for content and length.

- **Generating Response from AI Model:**

  - The user's prompt is sent to the AI model, and a streamed response is awaited.

- **Streaming the Response Back:**

  - The AI model's response is converted into a stream and sent back to the client in real-time.

- **Error Handling:**
  - Errors are logged (in the development environment) and an appropriate error response is sent back to the client.

### 4. Configuring CORS Policy with Middleware

The final step in setting up our API is to configure the Cross-Origin Resource Sharing (CORS) policies. This is crucial for managing how resources in your API are shared across different origins. We handle this through middleware in Next.js.

- **Creating Middleware:**

  - Begin by creating a file named `middleware.ts` (or `middleware.js` for JavaScript) in your project.
  - This middleware file will be responsible for setting up the necessary CORS response headers.

- **Implementing CORS Middleware:**

  - Here's the implementation of the middleware that sets up the CORS policy:

  ```typescript
  import { NextResponse } from "next/server";

  export function middleware() {
  	// retrieving the current response
  	const res = NextResponse.next();

  	// adding the CORS headers to the response
  	res.headers.append("Access-Control-Allow-Credentials", "true");
  	res.headers.append("Access-Control-Allow-Origin", "*"); // replace this with your actual origin in production
  	res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  	res.headers.append("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  	return res;
  }
  ```
