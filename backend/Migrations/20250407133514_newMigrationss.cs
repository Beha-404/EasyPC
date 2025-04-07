using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class newMigrationss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Corsair Vengeance DDR5 6000MHz 32GBRGB");

            migrationBuilder.UpdateData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Corsair 16GB 3200MHz DDR4 Vengeance LPX");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Corsair Vengeance DDR5 6000MHz 32GB 2x16GB RGB");

            migrationBuilder.UpdateData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Corsair 16GB 2x8GB 3200MHz DDR4 Vengeance LPX");
        }
    }
}
