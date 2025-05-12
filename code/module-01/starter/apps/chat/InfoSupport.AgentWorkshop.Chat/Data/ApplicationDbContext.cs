using InfoSupport.AgentWorkshop.Chat.Models;
using Microsoft.EntityFrameworkCore;

namespace InfoSupport.AgentWorkshop.Chat.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Conversation> Conversations => Set<Conversation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>().OwnsMany(c => c.Messages);
        modelBuilder.Entity<Conversation>().Property<byte[]>("RowVersion").IsRowVersion();

        modelBuilder.Entity<Conversation>()
            .Navigation(x => x.Messages)
            .AutoInclude(true)
            .UsePropertyAccessMode(PropertyAccessMode.Field)
            .HasField("_messages");
    }
}