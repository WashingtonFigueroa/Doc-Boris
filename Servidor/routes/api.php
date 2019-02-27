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
Route::get('tomografias-no-asignadas', 'RadiografiaController@tomografiasNoAsignadas');

Route::get('tipo-tomografias', 'API\TipoController@tomografias');
Route::get('tipo-radiografias', 'API\TipoController@radiografias');

Route::get('radiografia/{filename}',
            'RadiografiaController@radiografia');
Route::get('tomografia/{filename}',
            'RadiografiaController@tomografia');

Route::post('send-file', 'UploadController@sendFile');
//consultas
Route::get('sri/{tipo_documento}', 'API\ClienteController@sri');
Route::get('buscar-consultas/{valor?}', 'API\ConsultaController@buscar');
Route::get('sumradiografias', 'API\ReportesController@sumradiografias');
Route::get('sumrconsultas', 'API\ReportesController@sumrconsultas');
Route::get('diferencia', 'API\ReportesController@diferencia');
Route::get('valor/{start}/{end}', 'API\ReportesController@valor');

/*APIs de recursos*/
Route::apiResources([
    'clientes' => 'API\ClienteController',
    'profesionales' => 'API\ProfesionalController',
    'consultas' => 'API\ConsultaController',
    'consultas_tomografias' => 'API\ConsultaTomografiaController',
    'tipos' => 'API\TipoController',
    'sucursales' => 'API\SucursalesController',
]);
/*Clientes*/
Route::get('buscar-clientes/{valor?}', 'API\ClienteController@buscar');
Route::get('listar-clientes', 'API\ClienteController@listar');
/*tipo*/
Route::get('buscar-tipos/{valor?}', 'API\TipoController@buscar');
Route::get('listar-tipos', 'API\TipoController@listar');
/*sucrursales*/
Route::get('buscar-sucursales/{valor?}', 'API\SucursalesController@buscar');
Route::get('listar-sucursales', 'API\SucursalesController@listar');
/*Profesionales*/
Route::get('buscar-profesionales/{valor?}', 'API\ProfesionalController@buscar');
Route::get('listar-profesionales', 'API\ProfesionalController@listar');
