using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateV14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Pcs",
                type: "varbinary(max)",
                nullable: true);

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
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Pcs");
        }
    }
}
