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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username', 20);
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('user_type')->default(2);            
            $table->rememberToken()->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('product_name', 50);
            $table->string('product_description', 100)->unique();
            $table->string('price');
            $table->integer('stock');
            $table->timestamps();
        });

        Schema::create('carts', function (Blueprint $table) {
            $table->string('customer');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity');
            $table->timestamps();

            $table->foreign('product_id')->references('product_id')->on('products');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->string('customer');
            $table->string('phone');
            $table->string('delivery_address');
            $table->string('comments')->nullable();
            $table->decimal('order_total');
            $table->enum('order_status', ['Queued', 'Ready', 'Delivered', 'Canceled'])->default('Queued');
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity');
            $table->decimal('price');

            $table->foreign('order_id')->references('order_id')->on('orders');
            $table->foreign('product_id')->references('product_id')->on('products');
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
