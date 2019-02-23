<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RadiografiaTomografia extends Model
{
    use SoftDeletes;
    protected $table = 'radiografias_tomografias';
    protected $primaryKey = 'radiografia_tomografia_id';
    protected $fillable = [
        'archivo',
        'nombre',
        'asignado',
        'consulta_id',
        'sucursal_id',
    ];
    protected $dates = ['deleted_at'];
    protected $guarded = ['created_at'];
}