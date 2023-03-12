<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ProductPostRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = response()->json(Product::all());
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductPostRequest $request)
    {
        Product::create(
            $validated = $request->validated()
        );

        return $validated;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = json_decode(Product::find($id));
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductPostRequest $request, string $id)
    {
            $data = Product::find($id);
            $data->update($request->all())->validate;
            return $data;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Product::destroy($id);
    }

    public function search($productName)
    {
        return Product::where('ProductName', 'like', '%'.$productName.'%')->get();
    }
}
