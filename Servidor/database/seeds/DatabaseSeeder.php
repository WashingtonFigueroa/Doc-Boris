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
            'name' => 'SuperAdmin', 'email' => 'info@dt.com', 'password' => bcrypt('123456'),
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
