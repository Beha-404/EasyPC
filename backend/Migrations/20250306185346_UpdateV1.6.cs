using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Picture",
                table: "Pcs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Picture",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Picture",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Picture",
                table: "Pcs",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Picture",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pcs",
                keyColumn: "Id",
                keyValue: 2,
                column: "Picture",
                value: null);
        }
    }
}
