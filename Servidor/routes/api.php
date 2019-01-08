<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
//login
Route::post('login', 'AuthenticationController@login');
Route::post('logout', 'AuthenticationController@logout');



Route::post('upload', 'UploadController@upload');
Route::get('no-asignadas', 'RadiografiaController@noAsignadas');
Route::get('radiografia/{filename}',
            'RadiografiaController@radiografia');
Route::apiResources([
    'clientes' => 'API\ClienteController',
    'consultas' => 'API\ConsultaController',
]);
