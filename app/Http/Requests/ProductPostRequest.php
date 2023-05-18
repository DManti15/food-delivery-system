<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Ramsey\Uuid\Type\Decimal;

class ProductPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /*
    protected function prepareForValidation()
    {
        $this->merge([
            'ProductName' => str($this->str),
            'ProductDescription' => str($this->str),
            'Price' => dec($this->Decimal),
            'Stock' => inte,
        ]);
    }
    */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => 'required|string',
            'product_description' => 'required|string',
            'price' => 'required|decimal:0,2',
            'stock' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'Product Name is required!',
            'product_description.required' => 'Product Description is required!',
            'price.required' => 'Price is required!',
            'stock.required' => 'Stock is required!'
        ];
    }
}
