<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(User::orderBy('id', 'desc')->paginate(10), 200);
    }

    public function listaUsers()
    {
        return response()->json(User::orderBy('id', 'desc')->get, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:5|confirmed'
        ]);
        if ($validator->fails()){
            return response()->json([
                'error' => 'La confirmacion de password no coincide'
            ], 500);
            $user->save();
        } else {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
            return response()->json($user, 201);
        }
    }

    public function show($id)
    {
        return response()->json(User::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $User = User::find($id);
        $User->name = $request->input('name');
        $User->email = $request->input('email');
        $User->password = Hash::make($request->input('password'));
        $User->save();
        return response()->json($User, 200);
    }

    public function destroy($id)
    {
        $User = User::find($id);
        $User->delete();
        return response()->json([
            'eliminado' => 'Usuario ' . $User->name. ' eliminado exitosamente'
        ], 200);
    }
}
