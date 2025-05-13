# Starter for module 3

This directory contains the starter solution for module 3 of the workshop.
You can use this as the starting point for the labs in the module "Context Integration"

## Setup and Run the Project Locally

To set up and run the project locally using the `InfoSupport.AgentWorkshop.AppHost` project, follow these steps:

### Prerequisites

1. **Install .NET SDK**: Ensure you have .NET 9.0 installed on your system.
2. **Container Runtime**: Install Docker Desktop or Podman. If both are installed, set the environment variable `DOTNET_ASPIRE_CONTAINER_RUNTIME` to `podman` if you prefer Podman.
3. **Code Editor**: Use Visual Studio Code with the C# Dev Kit extension installed.

### Setup Instructions

1. **Clone the Repository**:
   Clone the project repository to your local machine.

2. **Restore Dependencies**:
   Open a terminal in the `InfoSupport.AgentWorkshop.AppHost` directory and run:

   ```bash
   dotnet restore
   ```

3. **Verify Aspire Templates**:
   Ensure the .NET Aspire templates are installed by running:

   ```bash
   dotnet new list aspire
   ```

   If not installed, refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/setup-tooling?tabs=windows&pivots=vscode) for installation steps.

4. **Configure Environment**:

   - Use `dotnet user-secrets set <Key> <Value>` in the `hosting/InfoSupport.AgentWorkshop.AppHost` directory to configure the environment secrets.
   - Ensure the `DOTNET_ENVIRONMENT` variable is set to `Development` for local development.

   | Required setting                | Value                        | Description                                                                                             |
   | ------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
   | ConnectionStrings:LanguageModel | Key=<Api Key>;Endpoint=<URL> | The API Key for the Azure OpenAI Service you're using and the URL of the Azure OpenAI service endpoint. |

5. **Run the AppHost Project**:
   In the `hosting/InfoSupport.AgentWorkshop.AppHost` directory, execute:

   ```bash
   dotnet run
   ```

   This will start the application and the .NET Aspire dashboard.

6. **Access the Dashboard**:

   - If using Visual Studio Code, the dashboard will open automatically in your browser.
   - If using the CLI, copy the dashboard URL from the terminal output and open it in your browser.

7. **Frontend Development**:

   - If you're running the app host you can access the development version of the frontend via http://localhost:3000/

### Additional Notes

- The `InfoSupport.AgentWorkshop.AppHost` project orchestrates services like the chat service and frontend.
- Use the `.NET Aspire dashboard` to monitor logs, traces, and environment configurations during development.

For more details, refer to the [Microsoft Learn documentation](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/setup-tooling?tabs=windows&pivots=vscode).
