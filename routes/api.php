<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;


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

/*
|--------------------------------------------------------------------------
Public Routes:
|--------------------------------------------------------------------------
*/

//Routes for everyone
Route::post('/register', [AuthController::class, 'register']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/search/{productdescription}', [ProductController::class, 'search']);
//Route::get('/login', function() { return view('login');});
Route::post('/login', [AuthController::class, 'login']);

//Routes for shopping cart
Route::post('/addToCart', [CartController::class, 'addProduct']);
Route::get('/myCart', [CartController::class, 'showCart']);
Route::delete('/myCart/{id}', [CartController::class, 'deleteCartItem']);
Route::post('/myCart', [CartController::class, 'placeOrder']);

/*
|--------------------------------------------------------------------------
Protected Routes:
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth:sanctum']], function () {


  //Routes for products table
  Route::post('/products', [ProductController::class, 'store']);
  Route::put('/products/{id}', [ProductController::class, 'update']);
  Route::delete('/products/{id}', [ProductController::class, 'destroy']);

  //Routes for users table
  Route::get('/users', [UserController::class, 'index']);
  Route::get('/users/{id}', [UserController::class, 'show']);
  Route::put('/users/{id}', [UserController::class, 'update']);
  Route::post('/users', [UserController::class, 'store']);
  Route::delete('/users/{id}', [UserController::class, 'destroy']);

  //Routes for orders table
  Route::get('/orders', [OrderController::class, 'showOrders']);
  Route::get('/orders/{id}', [OrderController::class, 'showOrder']);
  Route::put('/orders/{id}', [OrderController::class, 'editOrderStatus']);

  Route::get('/user', function (Request $request) {
    return $request->user();
  });

  Route::post('/logout', [AuthController::class, 'logout']);
});
