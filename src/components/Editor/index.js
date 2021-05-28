import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Controller } from 'react-hook-form';

function Editor({ control, defaultValue, rules }) {
	const editorConfiguration = {
		toolbar: {
			items: [
				'heading',
				'fontSize',
				'italic',
				'bold',
				'blockQuote',
				'link',
				'numberedList',
				'bulletedList',
				'horizontalLine',
				'indent',
				'outdent',
				'insertTable',
				'codeBlock',
				'image',
				'imageInsert',
				'mediaEmbed',
				'undo',
				'redo',
				'|',
			],
			shouldNotGroupWhenFull: true,
		},
		language: 'id',
		image: {
			toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
		},
		licenseKey: '',
	};

	return (
		<div>
			<Controller
				name="description"
				rules={rules}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { value, onChange } }) => (
					<CKEditor
						config={editorConfiguration}
						editor={ClassicEditor}
						data={value}
						onChange={(event, editor) => {
							const data = editor.getData();
							onChange(data);
						}}
					/>
				)}
			/>
		</div>
	);
}

export default Editor;
