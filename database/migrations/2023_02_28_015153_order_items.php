<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->foreignId('OrderID')->constrained('orders', 'id');
            $table->foreignId('ProductID')->constrained('products', 'id');
            $table->integer('Quantity');
            $table->decimal('Price', 6, 2);
            $table->decimal('ExtendedPrice', 6, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
