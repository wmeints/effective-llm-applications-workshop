# Ricardo Project - GitHub Copilot Instructions

This document contains instructions and conventions for working with the Ricardo project. The project uses .NET Aspire to orchestrate services, with an ASP.NET Core backend using Semantic Kernel for AI functionality, and a NextJS frontend.

## Project Structure

- **AppHost** (`/hosting/InfoSupport.Ricardo.AppHost`): .NET Aspire host project that orchestrates all services
- **Chat API** (`/apps/chat/InfoSupport.Ricardo.Chat`): ASP.NET Core API with Semantic Kernel integration
- **Frontend** (`/apps/frontend`): NextJS application with TypeScript and React

## Backend Development (.NET)

### Coding Conventions

- Use C# 13 features where appropriate (latest version as of .NET 9 preview)
- Follow Microsoft's C# coding conventions
- Use nullable reference types
- Prefer async/await for all I/O operations
- Use dependency injection for services

### .NET Aspire (AppHost)

- Use components from the Aspire library for adding services
- Register all application services in the `Program.cs` file
- Use environment-specific configuration for different deployment targets
- Configure distributed tracing and logging through the ServiceDefaults project

### ASP.NET Core Chat API

- Use minimal API syntax for endpoints when appropriate
- Group related endpoints using endpoint map functions
- Use strongly-typed options pattern for configuration
- Implement health checks for all dependencies
- Document all APIs using OpenAPI

### Semantic Kernel Integration

- Use the latest Semantic Kernel packages (currently v1.45.0)
- Define AI operations through plugins and skills
- Implement proper error handling for AI operations
- Use Azure OpenAI for production, with fallbacks if necessary
- Cache AI responses when appropriate to reduce costs

### Database

- Use Entity Framework Core with PostgreSQL
- Follow code-first approach with migrations
- Use database contexts with correctly defined entity relationships
- Create indexes for frequently queried fields
- Implement soft delete where appropriate
- Use specifications pattern for complex queries

## Frontend Development (NextJS)

### Coding Conventions

- Use TypeScript for all components and functions
- Follow functional component pattern with hooks
- Use ES6+ features
- Implement proper error boundaries
- Use named exports (avoid default exports)

### Component Structure

- Group components by feature in `/components` directory
- Use Shadcn UI components for accessible UI elements
- Always create strongly typed interfaces for component props
- Use explicit type annotations for all function parameters and return types
- Follow functional component pattern exclusively (no class components)
- Destructure props in function parameters for cleaner code
- Use TypeScript generics for reusable components

### Form Handling

- Use react-hook-form for managing form state and validation
- Use zod for schema validation with strong typing
- Create reusable form components with proper TypeScript interfaces
- Follow this pattern for form implementation:
  - Define zod schema for form data validation
  - Use zodResolver to connect schema with react-hook-form
  - Leverage TypeScript inference from zod schema with `z.infer<typeof schema>`
  - Use FormProvider for complex nested forms
  - Create custom wrapper components for Shadcn UI form elements
- Implement proper error handling and validation feedback
- Ensure forms are keyboard accessible and screen-reader friendly
- Group form-related utilities in a dedicated forms directory

### State Management

- Use React hooks for local state
- Use Zustand for global state management
- Keep state normalized when dealing with complex data
- Implement proper loading and error states

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Use Tailwind's utility classes consistently
- Use CSS variables for theming

## Testing

### Backend Testing

- Write unit tests for all business logic
- Use xUnit for testing .NET code
- Mock external dependencies using FakeItEasy
- Use in-memory database for data access tests
- Ensure test coverage for critical paths

### Frontend Testing

- Use Vitest as the test runner
- Use React Testing Library as the primary testing utility for components
- Implement snapshot testing for UI components to detect unexpected changes
- Focus on testing component behavior rather than implementation details
- Write tests that simulate user interactions (clicks, inputs, etc.)
- Use `screen` queries from Testing Library to find elements (prefer accessible queries)
- Create test utilities for common testing patterns
- Mock API calls and external services
- Use `vi.mock()` for mocking dependencies in tests
- Create separate test files with `.test.tsx` extensions

## Deployment

### Azure Developer CLI (azd)

- Use Azure Developer CLI (azd) as the primary deployment tool
- Store environment configuration in the `azure.yaml` file at the project root
- Create service-specific infrastructure definitions in the `infra` directory
- Use Bicep templates for consistent infrastructure as code
- Set up proper resource naming conventions in `main.bicep`
- Configure CI/CD pipelines to use azd for deployments
- Use azd's environment variables mechanism for configuration
- Set up different environments (dev, test, prod) with appropriate service tiers
- Ensure proper resource tagging for cost management

### .NET Aspire Orchestration

- Use Aspire's deployment tools for containerization
- Configure environment-specific settings through appsettings.{Environment}.json
- Use proper secrets management (no hardcoded secrets)
- Implement health checks and readiness probes

### CI/CD

- GitHub Actions workflows are in `.github/workflows`
- Ensure all tests pass before merging to main
- Set up separate environments for staging and production
- Use infrastructure as code for cloud resources

### Monitoring

- Use OpenTelemetry for tracing and metrics
- Set up proper exception handling and logging
- Configure alerts for critical errors
- Monitor API performance and response times

## Common Issues & Solutions

### Semantic Kernel

- When upgrading Semantic Kernel packages, check for breaking API changes
- Ensure proper error handling for token limits and API failures
- Monitor token usage to control costs

### NextJS Frontend

- Use server components vs. client components appropriately
- Implement proper error boundaries for AI response handling
- Use Suspense for loading states
- Optimize images using NextJS Image component

### PostgreSQL

- Run migrations as part of deployment
- Set up proper connection pooling
- Implement retry policies for transient failures
- Use query timeouts to prevent long-running queries
