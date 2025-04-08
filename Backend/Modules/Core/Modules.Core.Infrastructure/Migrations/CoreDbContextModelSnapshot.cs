﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Modules.Core.Infrastructure.DataAccessLayer;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Modules.Core.Infrastructure.Migrations
{
    [DbContext(typeof(CoreDbContext))]
    partial class CoreDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("core_db")
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Modules.Core.Domain.Aggregates.Habit.Entities.DailyHabitData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Count")
                        .HasColumnType("integer");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<Guid?>("HabitId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.ToTable("DailyHabitDatas", "core_db");
                });

            modelBuilder.Entity("Modules.Core.Domain.Aggregates.Habit.Habit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Positive")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("Habits", "core_db");
                });

            modelBuilder.Entity("Modules.Core.Domain.Aggregates.Habit.Entities.DailyHabitData", b =>
                {
                    b.HasOne("Modules.Core.Domain.Aggregates.Habit.Habit", null)
                        .WithMany("DailyHabitDatas")
                        .HasForeignKey("HabitId");
                });

            modelBuilder.Entity("Modules.Core.Domain.Aggregates.Habit.Habit", b =>
                {
                    b.Navigation("DailyHabitDatas");
                });
#pragma warning restore 612, 618
        }
    }
}
