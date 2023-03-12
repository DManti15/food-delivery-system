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
            'ProductName' => 'required|string',
            'ProductDescription' => 'required|string',
            'Price' => 'required|decimal:0,2',
            'Stock' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'ProductName.required' => 'Product Name is required!',
            'ProductDescription.required' => 'Product Description is required!',
            'Price.required' => 'Price is required!',
            'Stock.required' => 'Stock is required!'
        ];
    }
}
