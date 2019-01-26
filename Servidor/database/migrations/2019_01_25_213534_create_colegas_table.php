<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateColegasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colegas', function (Blueprint $table) {
            $table->increments('colegas_id');
            $table->string('documento');
            $table->string('razon_social');
            $table->string('email')->nullable();
            $table->string('celular')->nullable();
            $table->string('estado');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('colegas');
    }
}
