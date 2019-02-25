<?php

namespace App\Console;

use App\Http\Controllers\ConsultasController;
use GuzzleHttp\RequestOptions;
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
            //$servidor = 'http://nordentrx.com/public/api/';
            $servidor = 'http://localhost:8000/api/';
            $local = 'http://localhost:8080/api/';
            $files = [];
            foreach (Storage::disk('publico')->files('radiografias') as $filename) {
                $name = explode('/', $filename)[1];
                if(!(Storage::exists('radiografias/' . $name) && substr($name, -3) === 'png')) {
                    Storage::putFileAs('radiografias', new File(public_path($filename)), $name);
                    $client = new Client();
                    $result = $client->post($servidor . 'upload', [
                        'multipart' => [
                            [
                                'name' => 'archivo',
                                'contents' => fopen(public_path($filename), 'r'),
                                'filename' => $name
                            ]
                    ]]);
                    array_push($files, $filename);
                }
            }
            $directories = Storage::disk('publico')->directories('tomografias');
            foreach ($directories as $directory) {
                $cliente = new Client();
                $zip = explode("/", $directory)[1] . '-' . date('dmYHis') . '.zip';
                $params['form_params'] = [
                    'carpeta' => $directory,
                    'zip' => $zip
                ];
                $response = $cliente->post($local . 'tomografias', $params);
            }

        })->everyMinute();

        $servidor = 'http://localhost:8000/api/';
        $local = 'http://localhost:8080/api/';
        $cliente = new Client();
        $response = $cliente->get($local . 'zip-no-creados');

        $tomografias = $response->getBody();
        //carpeta public donde se encuentras las carpetas de
        //tomografias y radiografias
        $public = public_path() ;
        foreach ($tomografias as $tomografia) {
            $carpeta = $public . $tomografia->carpeta;
            $zip = $public . 'tomografias/' .$tomografia->zip;
            $command = 'CScript zip.vbs {$carpeta} {$zip}';
            exec($command);
        }


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
