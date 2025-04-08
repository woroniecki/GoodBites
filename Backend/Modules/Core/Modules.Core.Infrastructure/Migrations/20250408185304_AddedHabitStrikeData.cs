using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modules.Core.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedHabitStrikeData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "LastClickedDate",
                schema: "core_db",
                table: "Habits",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrikeCounter",
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
                name: "LastClickedDate",
                schema: "core_db",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "StrikeCounter",
                schema: "core_db",
                table: "Habits");
        }
    }
}
