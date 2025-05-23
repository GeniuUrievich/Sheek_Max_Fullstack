using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sheek_Max_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class p5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProduct_Carts_ProductID",
                table: "CartProduct");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "CartProduct",
                newName: "CartsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProduct_Carts_CartsId",
                table: "CartProduct",
                column: "CartsId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProduct_Carts_CartsId",
                table: "CartProduct");

            migrationBuilder.RenameColumn(
                name: "CartsId",
                table: "CartProduct",
                newName: "ProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProduct_Carts_ProductID",
                table: "CartProduct",
                column: "ProductID",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
