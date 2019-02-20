<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\sucursales;
use Illuminate\Http\Request;



class SucursalesController extends Controller
{
    public function index()
    {
        $sucursal = sucursales::orderBy('sucursal_id','desc')->paginate(10);
        return response()->json($sucursal, 200);
    }

    public function listar() {
        return response()->json(sucursales::orderBy('sucursal_id','desc')->get(), 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $sucursal = sucursales::orderBy('sucursal_id')->paginate(10);
        } else {
            $sucursal = sucursales::Where('ciudad', 'like', '%' . $valor . '%')
                ->orWhere('direccion', 'like', '%' . $valor . '%')
                ->orWhere('telefono', 'like', '%' . $valor . '%')
                ->orderBy('sucursal_id', 'desc')
                ->paginate(10);
        }
        return response()->json($sucursal, 200);
    }

    public function store(Request $request)
    {
        return response()->json(sucursales::create($request->all()), 201);
    }

    public function show($id)
    {
        return response()->json(sucursales::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $sucursal = sucursales::find($id);
        $sucursal->update($request->all());
        return response()->json($sucursal, 200);
    }

    public function destroy($id)
    {
        $sucursal = sucursales::find($id);
        $sucursal->delete();
        return response()->json($sucursal, 200);
    }
}
