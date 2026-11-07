# AI-Powered Smart Email Assistant

A full-stack application designed to assist with email composition using
AI. The repository is organized into a React frontend and a Java Spring
Boot backend.

## Overview

The project brings together a web-based user interface and a backend
service. The frontend is built with React and Vite, while the backend
uses Java and Spring Boot.

## Technology Stack

**Frontend** - React - JavaScript (ES6+) - HTML5 and CSS3 - Vite - npm

**Backend** - Java - Spring Boot - Maven - REST APIs

## Repository Structure

``` text
ai-powered-smart-email-assistant/
├── ai-email-assistant-frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── email-writer-sb/
│   ├── src/
│   └── pom.xml
└── README.md
```

The frontend and backend are maintained in separate directories. The
exact contents may change as development continues.

## Getting Started

### Prerequisites

-   Git
-   Node.js and npm
-   Java JDK compatible with the backend configuration
-   Maven, unless a Maven wrapper is provided

### 1. Clone the repository

``` bash
git clone https://github.com/vinnymishra/ai-powered-smart-email-assistant.git
cd ai-powered-smart-email-assistant
```

### 2. Start the frontend

From the repository root:

``` bash
cd ai-email-assistant-frontend
npm install
npm run dev
```

Vite displays the local development URL in the terminal. It is commonly
`http://localhost:5173`.

### 3. Start the backend

Open a second terminal from the repository root:

``` bash
cd email-writer-sb
mvn spring-boot:run
```

If the project includes a Maven wrapper, use `./mvnw spring-boot:run` on
macOS/Linux or `mvnw.cmd spring-boot:run` on Windows.

Check the backend configuration for the required Java version, port, AI
provider settings, and any additional dependencies.

## Configuration and Secrets

Configure API keys and other environment-specific values locally using
the variable names expected by the application.

-   Never commit API keys, passwords, access tokens, or other secrets.
-   Keep local environment files out of version control.
-   If needed, provide an example configuration file containing
    placeholder values only.

The exact environment variable names depend on the current
implementation. Refer to the frontend and backend configuration files.

## Application Flow

1.  The user interacts with the React frontend.
2.  The frontend sends a request to the backend API.
3.  The backend processes the request and performs the configured
    AI-assisted operation.
4.  The backend returns a response.
5.  The frontend displays the result.

Document the actual API endpoints, request formats, AI provider, and
supported options here as they are confirmed in the implementation.

## Frontend Development Commands

Run these commands from `ai-email-assistant-frontend/`:

  Command             Purpose
  ------------------- ------------------------------
  `npm install`       Install dependencies
  `npm run dev`       Start the development server
  `npm run build`     Create a production build
  `npm run preview`   Preview the production build

The `package.json` file defines the scripts available in this project.

## Security

-   Do not publish real credentials or API keys.
-   Do not commit local `.env` files containing secrets.
-   Validate and secure backend endpoints before deployment.
-   Configure CORS and production secrets appropriately for the
    deployment environment.

## Potential Future Enhancements

-   Additional email tone and style controls.
-   More flexible email prompts and customization.
-   Email draft history and management.
-   Improved validation and error handling.
-   Automated frontend and backend tests.
-   Production deployment and monitoring.

These are possible enhancements, not a claim that they are already
implemented.

## Author

**Vinayak Mishra**

-   GitHub: [@vinnymishra](https://github.com/vinnymishra)
-   Repository: [AI-Powered Smart Email
    Assistant](https://github.com/vinnymishra/ai-powered-smart-email-assistant)

## License

No license is specified in this repository. Add a license file and
update this section if you intend to distribute the project under an
open-source license.
