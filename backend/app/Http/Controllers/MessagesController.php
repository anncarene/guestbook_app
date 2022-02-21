<?php
	namespace App\Http\Controllers;
	use App\Http\Controllers\Controller;
	use Illuminate\Support\Facades\DB;
	use Illuminate\Http\Request;

	class MessagesController extends Controller {
		public function store(Request $request) {
			$name = $request->name;
			$message = $request->message;

			$date = date('Y-m-d H:i:s');

			DB::insert(
				"INSERT INTO `messages` (`name`, `message`, `date`) VALUES (?, ?, ?)",
				[
					$name,
					$message,
					$date
				]
			);
		}

		public function show($notesOnPage, $pageId) {
			$messages = DB::select(
				"SELECT * FROM `messages` ORDER BY id DESC LIMIT ?,?",
				[(($pageId - 1) * $notesOnPage), $notesOnPage]
			);
			$count = DB::table('messages')->count();
			$pages = 0;	

			if ($count < $notesOnPage) {
				$pages = 1;
			} else {
				$pages = ceil($count / $notesOnPage);
			}

			$data = [
				'messages' => $messages,
				'pages' => $pages,
			];

			return response()->json($data);
		}
	}
?>