<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UserPostRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = response()->json(User::all());
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserPostRequest $request)
    {
        User::create(
            $validated = $request->validated()
        );

        return $validated;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = json_decode(User::find($id));
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserPostRequest $request, string $id)
    {
            $data = User::find($id);
            $data->update($request->all());
            return $data;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return User::destroy($id);
    }

    public function search($userName)
    {
        return User::where('UserName', 'like', '%'.$userName.'%')->get();
    }
}
