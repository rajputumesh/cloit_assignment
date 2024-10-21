<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    public function index()
    {
        try {
            $menus = Menu::with('children', 'parent')->whereNull('parent_id')->get();
            return apiReqponse($menus, 200);
        } catch (Exception $e) {
            return apiReqponse(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|max:191',
        ]);
        if ($validation->fails()) {
            $error = $validation->errors()->first();
            return apiReqponse(['error' => $error], 400);
        }
        try {
            $menu = new Menu;
            $menu->name = $request->name;
            $menu->parent_id = $request->parent_id ?? null;
            $menu->save();
            $data = Menu::with('children', 'parent')->whereId($menu->id)->first();
            return apiReqponse($data, 200);
        } catch (Exception $e) {
            return apiReqponse(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Menu $menu)
    {
        //
    }

    public function update(Request $request, Menu $menu)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'menu_id' => 'required|max:36',
        ]);

        if ($validation->fails()) {
            $error = $validation->errors()->first();
            return apiReqponse(['error' => $error], 400);
        }
        try {
            $menu = Menu::find($request->menu_id);
            $menu->name = $request->name;
            $menu->parent_id = $request->parent_id ?? null;
            $menu->save();
            $data = Menu::with('children', 'parent')->whereId($menu->id)->first();
            return apiReqponse($data, 200);
        } catch (Exception $e) {
            return apiReqponse(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($menu_id)
    {
        try {
            Menu::find($menu_id)->delete();
            return apiReqponse([], 200);
        } catch (Exception $e) {
            return apiReqponse(['error' => $e->getMessage()], 500);
        }
    }
}
