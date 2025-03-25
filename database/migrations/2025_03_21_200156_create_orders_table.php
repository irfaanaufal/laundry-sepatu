<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('address_id')->constrained();
            $table->foreignId('shipping_cost_id')->constrained();
            $table->string('inv_no');
            $table->integer('qty');
            $table->float('distance');
            $table->double('grand_total');
            $table->enum('status', ['new', 'process', 'delivered', 'done', 'reviewed']);
            $table->timestamps();
            $table->dateTime('processed_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->dateTime('received_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
