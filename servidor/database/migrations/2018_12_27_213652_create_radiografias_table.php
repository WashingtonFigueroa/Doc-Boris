<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRadiografiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('radiografias_tomografias', function (Blueprint $table) {
            $table->increments('radiografia_tomografia_id');
            $table->string('archivo');
            $table->string('nombre');
            $table->enum('categoria', ['radiografia', 'tomografia']);
            $table->boolean('asignado')->default(false);
            $table->integer('consulta_id')->unsigned()->nullable();
            $table->integer('sucursal_id')->unsigned()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('radiografias_tomografias');
    }
}
