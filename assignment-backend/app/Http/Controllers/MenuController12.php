<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('children')->whereNull('parent_id')->get();
        return response()->json($menus);
    }

    public function show($id)
    {
        $menu = Menu::with('children')->findOrFail($id);
        return response()->json($menu);
    }

    public function store(Request $request)
    {
        $menu = new Menu();
        $menu->name = $request->name;
        $menu->parent_id = $request->parent_id; // Can be null for root items
        $menu->depth = $request->depth;
        $menu->save();

        return response()->json($menu);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $menu->name = $request->name;
        $menu->save();

        return response()->json($menu);
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Menu deleted']);
    }
}
