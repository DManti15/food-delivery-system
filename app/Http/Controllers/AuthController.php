<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 401);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            // Authentication successful
            $user = Auth::user();
            return response()->json(['user' => $user]);
        } else {
            // Authentication failed
            return response()->json(['errors' => ['login' => [__('auth.failed')]]], 401);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'login' => ['Invalid credentials'],
                ],
            ], 401);
        }

        /*$token = $user->createToken('auth_token')->plainTextToken;
          
        return response()->json([
          'user' => $user,
          'token' => $token
        ], 201);*/
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'status' => 201, 
            'message' => 'Logged out successfully'
        ]);
    }
}
