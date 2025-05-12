using InfoSupport.AgentWorkshop.Chat.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.SemanticKernel;

namespace InfoSupport.AgentWorkshop.Chat.Tests;

/// <summary>
/// Factory class for test objects.
/// </summary>
public class TestObjectFactory
{
    /// <summary>
    /// Creates a kernel object suitable for testing.
    /// </summary>
    /// <param name="configuration">Configuration to use for obtaining 
    /// the required OpenAI configuration information.</param>
    /// <returns>Returns the test kernel.</returns>
    public static Kernel CreateKernel(IConfiguration configuration)
    {
        var kernelBuilder = Kernel.CreateBuilder()
            .AddAzureOpenAIChatCompletion(
                configuration["LanguageModel:ChatDeploymentName"]!,
                configuration["LanguageModel:Endpoint"]!,
                configuration["LanguageModel:ApiKey"]!)
            .AddAzureOpenAITextEmbeddingGeneration(
                configuration["LanguageModel:EmbeddingDeploymentName"]!,
                configuration["LanguageModel:Endpoint"]!,
                configuration["LanguageModel:ApiKey"]!);

        return kernelBuilder.Build();
    }

    /// <summary>
    /// Creates a test configuration object with user-secret support.
    /// </summary>
    /// <returns>Returns a new configuration root object.</returns>
    public static IConfiguration CreateTestConfiguration()
    {
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<TestObjectFactory>()
            .Build();

        return configuration;
    }

    /// <summary>
    /// Creates an in-memory version of the <see cref="ApplicationDbContext"/> class.
    /// </summary>
    /// <returns>Returns a new instance of <see cref="ApplicationDbContext"/>.</returns>
    public static ApplicationDbContext CreateTestDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new ApplicationDbContext(options);
    }
}