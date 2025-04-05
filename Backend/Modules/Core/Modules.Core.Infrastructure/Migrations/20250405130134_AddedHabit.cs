using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modules.Core.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedHabit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "core_db");

            migrationBuilder.CreateTable(
                name: "Habits",
                schema: "core_db",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Positive = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Active = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DailyHabitDatas",
                schema: "core_db",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: false),
                    HabitId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyHabitDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyHabitDatas_Habits_HabitId",
                        column: x => x.HabitId,
                        principalSchema: "core_db",
                        principalTable: "Habits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyHabitDatas_HabitId",
                schema: "core_db",
                table: "DailyHabitDatas",
                column: "HabitId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyHabitDatas",
                schema: "core_db");

            migrationBuilder.DropTable(
                name: "Habits",
                schema: "core_db");
        }
    }
}
