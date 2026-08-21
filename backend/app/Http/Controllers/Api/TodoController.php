<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function __construct(protected Todo $todo)
    {
    }

    public function index()
    {
        return response()->json(
            Todo::all(),
            200,
            [],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
    }

    public function destroy(string $id)
    {
        $todo = $this->todo->find($id);

        $todo->delete();
        return response()->json([
            'message' => 'deleted'
        ]);

    }

    public function update(Request $request, string $id)
    {
        $todo = $this->todo->find($id);

        $todo->update([
            'title' => $request->title,
        ]);
        return response()->json([
            'message' => 'updated'
        ]);

    }

    public function store(Request $request)
    {

        $todo = $this->todo->create([
            'title' => $request->title,
        ]);
        return response()->json([
            'message' => 'created'
        ]);

    }
}
