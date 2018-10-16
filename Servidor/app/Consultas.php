<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consultas extends Model
{
    use SoftDeletes;
    protected $table = 'consultas';
    protected $primaryKey = 'consultas_id';
    protected $fillable = [
        'cliente_id',
        'numero_factura',
        'imagen',
    ];
    protected $hidden = [];
    protected $dates = ['deleted_at'];

    public function cliente() {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}
