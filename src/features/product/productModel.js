export const rules = {
	name: {
		required: { value: true, message: 'Nama produk tidak boleh kosong.' },
		maxLength: {
			value: 30,
			message: 'Panjang nama produk maksimal 30 karakter',
		},
	},
	catalog: {
		required: { value: true, message: 'Pilih catalog tidak boleh kosong.' },
	},
	price: {
		required: { value: true, message: 'Harga produk tidak boleh kosong.' },
		maxLength: {
			value: 4,
			message: 'Harga produk tidak wajar.',
		},
	},
	description: {
		required: { value: true, message: 'Deskripsi produk tidak boleh kosong.' },
	},
};

export const headerTable = [
	{
		Header: 'ID Product',
		accessor: 'id',
	},
	{
		Header: 'Name',
		accessor: 'name',
	},
	{
		Header: 'CreatedAt',
		accessor: 'created_at',
	},
];
