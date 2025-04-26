using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modules.Core.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddHabitColour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Colour",
                schema: "core_db",
                table: "Habits",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colour",
                schema: "core_db",
                table: "Habits");
        }
    }
}
