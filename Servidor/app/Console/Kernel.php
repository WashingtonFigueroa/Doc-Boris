<?php

namespace App\Console;

use App\Http\Controllers\ConsultasController;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $files = [];
            foreach (Storage::disk('publico')->files('archivos') as $filename) {
                $name = explode('/', $filename)[1];
                if(!Storage::exists('radiografias/' . $name)) {
                    Storage::putFileAs('radiografias', new File(public_path($filename)), $name);
                    array_push($files, $filename);
                }
            }
/*            $controller = new \App\Http\Controllers\ConsultasController();
            $controller->leerRadiografias();*/
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
