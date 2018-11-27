<?php

namespace App\Http\Controllers;

use App\Consultas;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        return response()->file(storage_path('app/radiografias/' . $filename));
    }
}
