<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Requests\StoreTodo;
use App\Http\Requests\UpdateTodo;

class TodoController extends Controller
{
    public function __construct(protected Todo $todo)
    {
    }

    public function index(Request $request)
    {
        $todos = $request->user()->todos;
        return response()->json(
            $todos,
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

    public function update(UpdateTodo $request, string $id)
    {
        $todo = $this->todo->find($id);
        $validated = $request->validated();

        $todo->update([
            'title' => $validated['title'],
        ]);
        return response()->json([
            'message' => 'updated'
        ]);

    }

    public function store(StoreTodo $request)
    {

        $validated = $request->validated();

        $todo = $this->todo->storeTodoList(
            $request->user()->id,
            $validated['title']
        );
        return response()->json([
            'message' => 'created'
        ]);

    }
}
