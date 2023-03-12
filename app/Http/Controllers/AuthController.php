<?php

Namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /*
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 'unauthorized']);
    }
    */

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'name' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) 
    {
        $validator = Validator::make($request->all(),[
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string']
        ]);

        if($validator->fails()) return response(['errors' => $validator->errors()], 401);

        $user = User::where('email', $request['Email'])->first();
        if(!$user || !Hash::check($request['password'], $user->password)){
            return response([
                'message' => 'Mistaken Credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'name' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user **/
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];

    }
}
