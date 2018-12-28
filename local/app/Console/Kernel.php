<?php

namespace App\Console;

use App\Http\Controllers\ConsultasController;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

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
                    $client = new Client();
                    $result = $client->post('http://localhost:8080/api/upload', [
                        'multipart' => [
                            [
                                'name' => 'archivo',
                                'contents' => fopen(public_path($filename), 'r'),
                                'filename' => $name
                            ]
                        ]
                    ]);
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
