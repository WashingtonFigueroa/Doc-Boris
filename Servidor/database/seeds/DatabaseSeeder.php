<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //TIPO USUARIOS
        $cargo = \App\Cargos::create(
            [
                'nombre' => 'administrador',
                'descripcion' => 'descripcion del administrador'
            ]
        );
        //Usuarios
        \App\User::create(
            [
                'cargo_id' => $cargo->cargo_id,
                'nombres' => 'Washington Figueroa',
                'cuenta' => 'Figo',
                'password' => Hash::make('123456'),
                'email' => 'info@dt.com']

        );
        //sucursales
        \App\sucursales::create([
            'ciudad' => 'Ibarra', 'direccion' => 'Calle Bolivar 7-63 y Pedro Moncayo Centro Comercial "Paseo Bolíavar" - Ibarra', 'telefono' => '(06)2604 538'
        ]);
        \App\sucursales::create([
            'ciudad' => 'Otavalo', 'direccion' => 'Calle Bolivar 1303, entre Quito y Quiroga Centro comercial "Randy Way" Local 3 - Otavalo', 'telefono' => '(06)2927 420'
        ]);
        //tipo radiografia
        \App\tipo::create(['tipo' => 'Panorámica de Maxilares', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Cefálica (Perfil)', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'A.T.M Bilateral BA/BC', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Postero-anterior Cráneo', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Carpales', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Senos Paranasales', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Periapical', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Bite Wing', 'categoria' => 'radiografia']);
        \App\tipo::create(['tipo' => 'Oclusal', 'categoria' => 'radiografia']);

    }
}
