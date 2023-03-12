<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="main">
        <h1>This is the menu mock-up view</h1>
        <table>
            <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Available</th>
            </tr>
            @foreach ($products as $product)
            <tr>
                <td>{{ $product->Name }}</td>
                <td>{{ $product->ProductDescription }}</td>
                <td>{{ $product->Price }}</td>
                <td>RM{{ $product->Stock }}</td>
            </tr>
      @endforeach
        </table>
    </div>
</body>
</html>