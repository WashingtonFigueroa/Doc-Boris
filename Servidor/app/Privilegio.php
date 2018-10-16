<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Privilegio extends Model
{
    use SoftDeletes;
    protected $table = 'privilegios';
    protected $primaryKey = 'privilegio_id';
    protected $fillable = [
        'ruta',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    public function tipoUsuario() {
        return $this->belongsTo(Tipousuario::class, 'tipo_usuario_id');
    }
}
