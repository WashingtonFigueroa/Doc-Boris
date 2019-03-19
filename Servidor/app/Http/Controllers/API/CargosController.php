<?php

namespace App\Http\Controllers\API;

use App\Cargos;
use App\Privilegios;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CargosController extends Controller
{
    private $accesos = [
        '/cargos/listar',
        '/privilegios',
        '/asignacioneventos/listar',
        '/miembros/listar',
        '/proyectos/listar',
        '/inscripciones/listar',
        '/anexos/listar',
        '/organizaciones/listar',
        '/eventos/listar',
        '/asignaciones/listar',
        '/tipoorganizacion/listar',
        '/tipoproyectos/listar',
        '/tipoeventos/listar',
        '/actividades/listar',
        '/insumos/tipo-insumos/listar',
        '/ubicaciones/listar',
        '/usuarios/listar'
    ];
    public function getPrivilegio($ruta) {
        $privilegio = '';
        switch ($ruta) {
            case '/cargos/listar': $privilegio = 'cargos'; break;
            case '/privilegios': $privilegio = 'privilegios'; break;
            case '/asignacioneventos/listar': $privilegio = 'asignar-proyectos'; break;
            case '/miembros/listar': $privilegio = 'personas'; break;
            case '/proyectos/listar': $privilegio = 'proyectos'; break;
            case '/inscripciones/listar': $privilegio = 'inscripciones'; break;
            case '/anexos/listar': $privilegio = 'subir-anexos'; break;
            case '/organizaciones/listar': $privilegio = 'organizaciones'; break;
            case '/eventos/listar': $privilegio = 'eventos'; break;
            case '/asignaciones/listar': $privilegio = 'asignar-insumos'; break;

            case '/tipoorganizacion/listar': $privilegio = 'configuracion'; break;
            case '/tipoproyectos/listar': $privilegio = 'configuracion'; break;
            case '/tipoeventos/listar': $privilegio = 'configuracion'; break;
            case '/actividades/listar': $privilegio = 'configuracion'; break;
            case '/insumos/tipo-insumos/listar': $privilegio = 'configuracion'; break;
            case '/ubicaciones/listar': $privilegio = 'configuracion';break;
            case '/usuarios/listar': $privilegio = 'configuracion';break;
        }
        return $privilegio;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Cargos::orderBy('nombre')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cargo = Cargos::create($request->all());
        foreach ($this->accesos as $acceso) {
            Privilegios::create([
                'cargo_id' => $cargo->cargo_id,
                'acceso' => $acceso,
                'activo' => 'si'
            ]);
        }
        return response()->json($cargo, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Cargos::find($id), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cargo = Cargos::find($id);
        $cargo->update($request->all());
        return response()->json($cargo, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cargo = Cargos::find($id);
        $cargo->delete();
        return response()->json($cargo, 200);
    }

    public function privilegios($cargo_id) {
        $data = [];
        $privilegios = Privilegios::where('cargo_id', '=', $cargo_id)->get();
        $configuracion = 0;
        foreach ($privilegios as $privilegio) {
            $acceso = $this->getPrivilegio($privilegio->acceso);
            if ($acceso === 'configuracion') {
                if ($privilegio->activo === 'si') {
                    $configuracion++;
                }
            } else {
                $data[$acceso] = [
                    'cargo_id' => (int)$cargo_id,
                    'privilegio' => $acceso,
                    'activo' => $privilegio->activo
                ];
            }
        }
        if ($configuracion === 7) {
            $data['configuracion'] = [
                'cargo_id' => (int)$cargo_id,
                'privilegio' => 'configuracion',
                'activo' => 'si'
            ];
        } else {
            $data['configuracion'] = [
                'cargo_id' => (int)$cargo_id,
                'privilegio' => 'configuracion',
                'activo' => 'no'
            ];
        }
        return response()->json($data, 200);
    }
}