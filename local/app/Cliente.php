<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;
    protected $table = 'clientes';
    protected $primaryKey = 'cliente_id';
    protected $fillable = [
        'nombres',
        'tipo_documento',
        'documento',
        'razon_social',
        'direccion',
        'fecha_nacimiento',
        'celular'
    ];
    protected $dates = ['deleted_at'];

    public function consultas() {
        return $this->hasMany(Consultas::class, 'consulta_id');
    }

    public static function boot()
    {
        parent::boot();
        self::deleting(function ($parent) {
            $parent->productos()->delete();
        });
    }

}
