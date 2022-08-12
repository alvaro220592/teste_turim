<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Person::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $person = new Person;
        $person->fill($request->all());
        if($person->save()){
            return response()->json(['response' => 'ok', 'message' => 'Pessoa cadastrada com sucesso']);
        }else{
            return response()->json(['response' => 'erro', 'message' => 'Erro ao cadastrar']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person, $id)
    {
        $person = Person::find($id);

        if(!$person){
            return response()->json(['response' => 'erro', 'message' => 'Pessoa não encontrada']);
        }

        if($person->delete()){
            return response()->json(['response' => 'ok', 'message' => 'Pessoa excluída com sucesso']);
        }else{
            return response()->json(['response' => 'erro', 'message' => 'Erro ao excluir']);
        }
    }
}
