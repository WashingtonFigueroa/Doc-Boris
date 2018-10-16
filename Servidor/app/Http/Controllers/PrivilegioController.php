<?php

namespace App\Http\Controllers;

use App\Privilegio;
use Illuminate\Http\Request;

class PrivilegioController extends Controller
{
    public function index()
    {
        return response()->json(Privilegio::orderBy('ruta')->get(), 200);
    }

    public function store(Request $request)
    {
        return response()->json(Privilegio::create($request->all()), 201);
    }

    public function show($id)
    {
        return response()->json(Privilegio::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $privilegio = Privilegio::find($id);
        $privilegio->update($request->all());
        return response()->json($privilegio, 200);
    }

    public function destroy($id)
    {
        $privilegio = Privilegio::find($id);
        $privilegio->delete();
        return response()->json($privilegio, 200);
    }
}
