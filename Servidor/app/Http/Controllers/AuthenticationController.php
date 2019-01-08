<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthenticationController extends Controller
{
    public function login(){
        $credentials = request()->only('email', 'password');
        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:5',
        ];
        $validator = Validator::make($credentials, $rules);
        if ($validator->fails()) {
            return response()->json([
                'autenticado' => false,
                'mensaje' => $validator->messages()
            ], 500);
        }
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'autenticado' => false,
                    'mensaje' => 'Las credenciales son Incorrectas'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'autenticado' => false,
                'mensaje' => 'Error, por favor intente nuevamente'],
                500);
        }

        $usuario = User::where('email', \request()->input('email'))->first();

        return response()->json([
            'autenticado' => true,
            'usuario' => $usuario,
            'token' => $token,
            'mensaje' => 'Bienvedido a Ctrl-RX'
        ], 200);
    }
    public function logout(){

    }
}
