<?php

use Illuminate\Http\Request;

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
//login
Route::post('login', 'AuthenticationController@login');
Route::post('logout', 'AuthenticationController@logout');
//usuario
Route::resource('usuarios', 'UsuarioController');
Route::resource('listaUsuarios', 'UsuarioController@listaUsers');
//sistema
Route::post('upload', 'UploadController@upload');
Route::post('upload-tomografia', 'UploadController@uploadTomografia');
Route::get('radiografias-no-asignadas', 'RadiografiaController@noAsignadas');
Route::get('radiografia/{filename}',
            'RadiografiaController@radiografia');
Route::post('send-file', 'UploadController@sendFile');
//consultas
Route::get('sri/{tipo_documento}', 'API\ClienteController@sri');
Route::get('sumradiografias', 'API\ReportesController@sumradiografias');
Route::get('sumrconsultas', 'API\ReportesController@sumrconsultas');
Route::get('diferencia', 'API\ReportesController@diferencia');

/*APIs de recursos*/
Route::apiResources([
    'clientes' => 'API\ClienteController',
    'profesionales' => 'API\ProfesionalController',
    'consultas' => 'API\ConsultaController',
    'consultas_tomografias' => 'API\ConsultaTomografiaController',
]);
/*Clientes*/
Route::get('buscar-clientes/{valor?}', 'API\ClienteController@buscar');
Route::get('listar-clientes', 'API\ClienteController@listar');
