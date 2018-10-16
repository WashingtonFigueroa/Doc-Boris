<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tipousuario extends Model
{
    use SoftDeletes;
    protected $table = 'tipousuarios';
    protected $primaryKey = 'tipo_usuario_id';
    protected $fillable = [
        'nombre',
        'descripcion',
        'estado'
    ];
    protected $dates = ['deleted_at'];
    public function usuarios() {
        return $this->hasMany(User::class, 'tipo_usuario_id');
    }
    public function privilegios() {
        return $this->hasMany(Privilegio::class, 'tipo_usuario_id');
    }
    public static function boot()
    {
        parent::boot();
        self::deleting(function ($parent) {
            $parent->usuarios()->delete();
            $parent->privilegios()->delete();
        });
    }
}
