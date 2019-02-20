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
        \App\User::create([
            'name' => 'SuperAdmin', 'email' => 'info@dt.com', 'password' => bcrypt('123456')
        ]);
        \App\sucursales::create([
            'ciudad' => 'Ibarra', 'direccion' => 'Calle Bolivar y ', 'telefono' => '123456'
        ]);
        \App\sucursales::create([
            'ciudad' => 'Otavalo', 'direccion' => 'Calle Bolivar y ', 'telefono' => '123456'
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
