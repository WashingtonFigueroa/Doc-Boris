<?php

namespace App\Console;

use App\Http\Controllers\ConsultasController;
use App\Tomografia;
use GuzzleHttp\RequestOptions;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

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
            /*
             * 1 Ibarra
             * 2 Otavalo
             * 3 Otra
             * 4 Otro
             * 5 Quien sabe
             * 6 mmmm :O
             * */
            $servidor = 'http://localhost:8000/api/';
            $local = 'http://localhost:8080/api/';

            $sucursal_id = 1;
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
                            ],
                            [
                                'name' => 'sucursal_id',
                                'contents' => $sucursal_id
                            ]
                    ]]);
                    array_push($files, $filename);
                }
            }
            foreach(Storage::disk('publico')->files('tomografias') as $tomografia) {
                $zip = explode('/', $tomografia)[1];
                if(!(Storage::exists('tomografias/' . $zip) && substr($zip, -3) === 'zip')) {
                    Storage::putFileAs('tomografias', new File(public_path($tomografia)), $zip);
                    $client = new Client();
                    $result = $client->post($servidor . 'upload-tomografia', [
                        'multipart' => [
                            [
                                'name' => 'archivo',
                                'contents' => fopen(public_path($tomografia), 'r'),
                                'filename' => $zip
                            ],
                            [
                                'name' => 'sucursal_id',
                                'contents' => $sucursal_id
                            ]
                        ]]);
                    $tomografia_no_subida = Tomografia::where('zip', '=', $zip)->first();
                    $tomografia_no_subida->subido = true;
                    $tomografia_no_subida->save();
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
