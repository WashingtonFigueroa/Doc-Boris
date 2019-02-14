<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsultasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->increments('consulta_id');
            $table->integer('cliente_id')->unsigned();
            $table->foreign('cliente_id')
                    ->references('cliente_id')
                    ->on('clientes')
                    ->onDelete('cascade');
            $table->integer('profesional_id')->unsigned();
            $table->foreign('profesional_id')
                ->references('profesional_id')
                ->on('profesionales')
                ->onDelete('cascade');
            $table->string('numero_factura');
            $table->string('imagen');
            $table->string('tipo');
            $table->float('valor', 8, 2);
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
        Schema::dropIfExists('consultas');
    }
}
