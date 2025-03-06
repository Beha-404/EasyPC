using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Pcs",
                columns: new[] { "Id", "Available", "CaseId", "GraphicsCardId", "MotherBoardId", "Name", "Picture", "Price", "ProcessorId", "PsuId", "RamId", "Type" },
                values: new object[,]
                {
                    { 1, true, 1, 1, 1, "Gaming PC", null, 1200, 1, 1, 1, "PC" },
                    { 2, true, 2, 2, 2, "Streaming PC", null, 1500, 2, 2, 2, "PC" }
                });
        }
    }
}
