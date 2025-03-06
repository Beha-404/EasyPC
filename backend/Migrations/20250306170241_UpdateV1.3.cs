using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Seasonic G12 GC 700W 80+ Gold");

            migrationBuilder.UpdateData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Gigabyte GP-UD850GM PG5 GEU2 1000W ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Seasonic G12 GC 850W 80+ Gold");

            migrationBuilder.UpdateData(
                table: "PSUs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Gigabyte GP-UD850GM PG5 GEU2");
        }
    }
}
