using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orcana.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameMovementKindToDirection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Kind",
                table: "Movements",
                newName: "Direction");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Direction",
                table: "Movements",
                newName: "Kind");
        }
    }
}
