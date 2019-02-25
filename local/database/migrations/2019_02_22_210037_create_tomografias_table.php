<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTomografiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tomografias', function (Blueprint $table) {
            $table->increments('tomografia_id');
            $table->string('carpeta')->nullable();
            $table->string('zip')->nullable();
            $table->boolean('creado')->default(false);
            $table->boolean('subido')->default(false);
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
        Schema::dropIfExists('tomografias');
    }
}
