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
            $servidor = 'http://localhost:8000/api/';
            $files = [];
            foreach (Storage::disk('publico')->files('radiografias') as $filename) {
                $name = explode('/', $filename)[1];
                if(!Storage::exists('radiografias/' . $name)) {
                    $client = new Client();
                    $result = $client->post($servidor . 'upload', [
                        'multipart' => [
                            [
                                'name' => 'archivo',
                                'contents' => fopen(public_path($filename), 'r'),
                                'filename' => $name
                            ]
                    ]]);
                    Storage::putFileAs('radiografias', new File(public_path($filename)), $name);
                    array_push($files, $filename);
                }
            }
            foreach (Storage::disk('publico')->files('tomografias') as $filename) {
                $name = explode('/', $filename)[1];
                if(!Storage::exists('tomografias/' . $name)) {
                    $client = new Client();
                    $result = $client->post($servidor . 'upload-tomografia', [
                        'multipart' => [
                            [
                                'name' => 'archivo',
                                'contents' => fopen(public_path($filename), 'r'),
                                'filename' => $name
                            ]
                        ]
                    ]);
                    Storage::putFileAs('tomografias', new File(public_path($filename)), $name);
                    array_push($files, $filename);
                }
            }

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
