<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consulta extends Model
{
    use SoftDeletes;
    protected $table = 'consultas';
    protected $primaryKey = 'consulta_id';
    protected $fillable = [
        'profesional_id',
        'cliente_id',
        'numero_factura',
        'imagen',
        'tipo',
        'valor'
    ];
}
