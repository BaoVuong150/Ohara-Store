using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ohara.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryParentAndNegativeConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParentCategoryId",
                schema: "products",
                table: "Categories",
                type: "text",
                nullable: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_ProductVariant_OriginalPrice_NonNegative",
                schema: "products",
                table: "ProductVariants",
                sql: "\"OriginalPrice\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ProductVariant_Price_NonNegative",
                schema: "products",
                table: "ProductVariants",
                sql: "\"Price\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ProductVariant_StockQuantity_NonNegative",
                schema: "products",
                table: "ProductVariants",
                sql: "\"StockQuantity\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryId",
                schema: "products",
                table: "Categories",
                column: "ParentCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Categories_ParentCategoryId",
                schema: "products",
                table: "Categories",
                column: "ParentCategoryId",
                principalSchema: "products",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Categories_ParentCategoryId",
                schema: "products",
                table: "Categories");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ProductVariant_OriginalPrice_NonNegative",
                schema: "products",
                table: "ProductVariants");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ProductVariant_Price_NonNegative",
                schema: "products",
                table: "ProductVariants");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ProductVariant_StockQuantity_NonNegative",
                schema: "products",
                table: "ProductVariants");

            migrationBuilder.DropIndex(
                name: "IX_Categories_ParentCategoryId",
                schema: "products",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ParentCategoryId",
                schema: "products",
                table: "Categories");
        }
    }
}
