using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataV10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Cases",
                columns: new[] { "Id", "FormFactor", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { 1, null, "SAMA Tank 3 ( Titan II , V710 )", "150", "CASE" },
                    { 2, null, "MS Armor V500", "100", "CASE" }
                });

            migrationBuilder.InsertData(
                table: "Graphics_Cards",
                columns: new[] { "Id", "Name", "Price", "Type", "VRAM" },
                values: new object[,]
                {
                    { 1, "RTX 4090", "1400", "GPU", "24GB" },
                    { 2, "RX 7900 XTX", "1000", "GPU", "24GB" }
                });

            migrationBuilder.InsertData(
                table: "Motherboards",
                columns: new[] { "Id", "Model", "Name", "Price", "Socket", "SupportsOverclocking", "Type" },
                values: new object[,]
                {
                    { 1, null, "MSI Pro B650-S WiFi & Bluetooth AM5 DDR5", "450", "AM5", false, "MOTHERBOARD" },
                    { 2, null, "Maticna Gigabyte b760 GAMING X AX DDR5", "400", "LGA 1700", false, "MOTHERBOARD" }
                });

            migrationBuilder.InsertData(
                table: "PSUs",
                columns: new[] { "Id", "Name", "Power", "Price", "Type" },
                values: new object[,]
                {
                    { 1, "Seasonic G12 GC 850W 80+ Gold", "850W", "150", "PSU" },
                    { 2, "Gigabyte GP-UD850GM PG5 GEU2", "800W", "200", "PSU" }
                });

            migrationBuilder.InsertData(
                table: "Processors",
                columns: new[] { "Id", "CoreCount", "Name", "Price", "Socket", "ThreadCount", "Type" },
                values: new object[,]
                {
                    { 1, 4, "Ryzen 7 7800X3D", 500, "AM5", 8, "CPU" },
                    { 2, 8, "i7 12700k", 500, "LGA 1700", 12, "CPU" }
                });

            migrationBuilder.InsertData(
                table: "RAMs",
                columns: new[] { "Id", "Name", "Price", "Speed", "Type" },
                values: new object[,]
                {
                    { 1, "Corsair Vengeance DDR5 6000MHz 32GB 2x16GB RGB", "200", "6000", "RAM" },
                    { 2, "Corsair 16GB 2x8GB 3200MHz DDR4 Vengeance LPX", "100", "3200", "RAM" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Cases",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cases",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Graphics_Cards",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Graphics_Cards",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Motherboards",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Motherboards",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RAMs",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
