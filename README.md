# Course: Building Effective LLM-Based Applications with Semantic Kernel

Welcome to the source repository for the workshop "Building Effective LLM-Based
Applications with Semantic Kernel". In this workshop we teach people how to build
LLM-based applications with Semantic Kernel.

## Why this workshop

This hands-on workshop transforms the theoretical knowledge from the book 
"Building Effective LLM-Based Applications with Semantic Kernel" into practical
implementation skills. While books provide comprehensive knowledge, workshops offer
immediate application and feedback. This workshop was created to:

- Give developers direct, hands-on experience with LLM application patterns
- Provide structured guidance through common implementation challenges
- Create a collaborative learning environment where participants can share insights
- Transform theoretical concepts into working code you can reference for future projects

## Target audience

This workshop is designed for:

- Software developers who want to integrate LLMs into enterprise applications
- C# developers looking for practical examples beyond the Python-dominated tutorials
- Technical architects designing LLM-powered solutions
- Developers who learn best through hands-on implementation rather than theory alone

**Important** The course materials focus on C# for now. We'll add detailed labs for
Python and Java at a later date!

## Major Learning Goals

By the end of this 3-hour workshop, participants will be able to:

- Set up a Semantic Kernel environment - Configure the essential components for RAG applications
- Process and embed documents - Transform documents into vector embeddings for retrieval
- Implement vector search - Create efficient retrieval mechanisms for relevant content
- Design effective RAG prompts - Craft prompts that properly utilize retrieved context
- Build a complete RAG pipeline - Connect all components into a working domain-specific assistant

## Prerequisites

Participants should have:

- Working knowledge of C# programming
- .NET SDK 9.0 or higher installed
- Docker Desktop or similar containerization tool
- Visual Studio Code or similar code editor
- Azure CLI for working with Azure OpenAI
- GitHub account to access workshop materials

## Workshop Pacing

The workshop is structured as a compact 3-hour session focused exclusively on RAG implementation.
The first module will be more theoretical in nature while the other modules focus on hands-on labs:

| Time      | Module                              | Description                                                           |
| --------- | ----------------------------------- | --------------------------------------------------------------------- |
| 0:00-0:45 | Fundamentals & Environment Setup    | Overview of LLMS, RAG architecture and configuring Semantic Kernel    |
| 0:45-1:30 | Document Processing & Embeddings    | Implementing text splitting, embedding generation, and vector storage |
| 1:30-2:45 | Context Integration                 | Creating prompts that effectively use retrieved information           |
| 2:45-3:00 | Q&A and Next Steps                  | Discussion of advanced techniques and resources for further learning  |

Each module includes:

- A brief conceptual explanation
- Step-by-step labs to get hands-on experience
- Working code examples to demonstrate the end results
- Explanation of common pitfalls and solutions

## Supplemental Resources for Facilitators

To prepare for facilitating this workshop:

1. **Required Reading**:
   - [Building Effective LLM-Based Applications with Semantic Kernel](https://leanpub.com/effective-llm-applications-with-semantic-kernel/) (focus on the RAG chapter)
   - [Microsoft Semantic Kernel Documentation on Memory and Embeddings](https://learn.microsoft.com/en-us/semantic-kernel/memories/)

2. **Environment Preparation**:
   - Set up the [GitHub repository](https://github.com/wmeints/effective-llm-applications/) samples for RAG
   - Prepare sample documents for embedding demonstrations (You can use [the raw book content](https://github.com/wmeints/effective-llm-applications) for this)
   - Ensure you have API keys for OpenAI or Azure OpenAI embeddings and text generation

3. **Discussion Preparation**:
   - Prepare examples of effective vs. ineffective RAG implementations
   - Review common challenges in text chunking and retrieval
   - Be ready to discuss tradeoffs in chunk size, embedding models, and context window utilization

4. **Additional Resources**:
   - [Semantic Kernel Memory concepts](https://github.com/microsoft/semantic-kernel/tree/main/dotnet/samples/Concepts/Memory)
   - [Azure Cognitive Search integration samples](https://github.com/Azure-Samples/azure-search-openai-demo-csharp)
   - [OpenAI Cookbook RAG examples](https://github.com/openai/openai-cookbook/tree/main/examples/vector_databases)

## Getting Started

1. Navigate to the workshop website: https://wmeints.github.com/effective-llm-applications-workshop
2. Follow the setup instructions on the website.

For questions or issues, please create an issue in the [GitHub repository](https://github.com/wmeints/effective-llm-applications/).

## Working on the course materials

This course is being developed as an [Astro](https://astro.build) website. You can find the sources for the
course guides in the [site](./site) directory. The lab content is located in [labs](./labs).

Please make sure to submit issues for things you want to see changed.

---

Workshop materials based on the book "Building Effective LLM-Based Applications with Semantic Kernel" by Willem Meints.
