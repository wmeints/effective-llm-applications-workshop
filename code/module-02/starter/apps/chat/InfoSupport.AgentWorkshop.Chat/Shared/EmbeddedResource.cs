namespace InfoSupport.AgentWorkshop.Chat.Shared;

/// <summary>
/// Helper class to work with embedded resources.
/// </summary>
public static class EmbeddedResource
{
    /// <summary>
    /// Reads the content of an embedded resource.
    /// </summary>
    /// <param name="name">Name of the resource without the namespace prefix.</param>
    /// <returns>Returns the contents of the embedded resource.</returns>
    /// <exception cref="InvalidOperationException">Gets thrown when the resource couldn't be found.</exception>
    public static string Read(string name)
    {
        var resourceIdentifier = $"InfoSupport.AgentWorkshop.Chat.{name}";
        using var stream = typeof(EmbeddedResource).Assembly.GetManifestResourceStream(resourceIdentifier);

        if (stream == null)
        {
            throw new InvalidOperationException($"EmbeddedResource '{resourceIdentifier}' not found");
        }

        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }
}