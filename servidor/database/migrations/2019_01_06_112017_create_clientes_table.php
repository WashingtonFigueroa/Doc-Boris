<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->increments('cliente_id');
            $table->enum('tipo_documento', ['cedula', 'ruc', 'pasaporte']);
            $table->string('documento');
            $table->string('razon_social');
            $table->string('direccion');
            $table->date('fecha_nacimiento');
            $table->string('celular')->nullable();
            $table->string('genero')->nullable();
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
        Schema::dropIfExists('clientes');
    }
}
