using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modules.Core.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "core_db",
                table: "Habits");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "core_db",
                table: "Habits",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
