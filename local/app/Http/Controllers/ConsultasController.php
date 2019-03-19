<?php

namespace App\Http\Controllers;

use App\Consultas;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ConsultasController extends Controller
{
    public function index()
    {
        return response()->json(Consultas::orderBy('numero_factura	')->paginate(10), 200);
    }
    public function lista_consultas()
    {
        return response()->json(Consultas::orderBy('numero_factura	')->get(), 200);
    }
    public function ver_documento($id) {
        $documento = Consultas::find($id)->documento;
        return response()->file(storage_path('app/' . $documento));
    }
    public function store(Request $request)
    {
        if ($request->hasFile('documento')){
            $path_documento = $request->file('documento')->store('documento');
            $consulta = new Consultas();
            $consulta->cliente_id = $request->input('cliente_id');
            $consulta->numero_factura = $request->input('numero_factura');
            $consulta->imagen = $path_documento;
            $consulta->save();
            return response()->json($consulta, 201);
        }
    }
    public function show($id)
    {
        return response()->json(Consultas::find($id), 200);
    }
    public function update($id)
    {
        $consulta = Consultas::find($id);
        $consulta->update(request()->all());
        return response()->json($consulta, 200);
    }
    public function destroy($id)
    {
        $consulta = Consultas::find($id);
        $consulta->delete();
        return response()->json(['exito' => 'Consulta ' . $consulta->numero_factura . ' eliminado exitosamente'], 200);
    }
    public function buscar_consultas() {
        $search = request()->input('search');
        $consultas = Consultas::where('numero_factura', 'like', '%'. $search . '%')
            ->orWhere('cliente_id', 'like', '%'. $search . '%')
            ->paginate(10);
        return response()->json($consultas, 200);
    }
    /*
     * Lee nuevos archivos una vez subido a la carpeta archivos dentro de public
     * */
    public function leerRadiografias() {
        $files = [];
        foreach (Storage::disk('publico')->files('archivos') as $filename) {
            $name = explode('/', $filename)[1];
            if(!Storage::exists('radiografias/' . $name)) {

                $client = new Client();
                $result = $client->post('http://localhost:8080/api/upload', [
                    'multipart' => [
                        [
                            'name' => 'archivo',
                            'contents' => new File(public_path($filename)),
                            'filename' => $name
                        ]
                    ]
                ]);
                Storage::putFileAs('radiografias', new File(public_path($filename)), $name);
                array_push($files, $filename);
            }
        }
        if(sizeof($files) === 0) {
            return response()->json([
                'mensaje' => 'No existen nuevos archivos'
            ]);
        } else {
            return response()->json($files, 200);
        }
    }

    public function radiografias() {
        $files = [];
        foreach (Storage::files('radiografias') as $filename) {
            array_push($files, $filename);
        }
        return response()->json($files, 200);
    }

    public function verRadiografia($filename) {
/*        return response()->json([
            'response' => $filename,
            'storage_path' => storage_path('app/radiografias/' . $filename)
        ], 200);*/
        return response()->file(storage_path('app/radiografias/' . $filename));
    }

    public function zip($radiografia) {
        $archivo = substr($radiografia, 0, -4);
        $programa = base_path() . '\\comprimir-archivo.bat';

        $command = '"' . $programa .'" '.  $archivo . " " . $radiografia;
/*        exec('c:\WINDOWS\system32\cmd.exe /c START ' . $script);*/
        $process = new Process($command);
        $process->run();
        if (!$process->isSuccessful()){
            throw new ProcessFailedException($process);
        }
        $data = $process->getOutput();

        $files = glob(storage_path('app/warehouse/' . $archivo . '/*'));
        Zipper::make(storage_path('app/warehouse/' . $archivo . '.zip'))->add($files)->close();

        return response()->json("exito de zip", 200);
    }
}
