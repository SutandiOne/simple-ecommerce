import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

function Table({ columns, data, changeForm, deleteForm }) {
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,

		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 5 },
		},
		useSortBy,
		usePagination
	);

	return (
		<>
			<table
				{...getTableProps}
				className="w-full table-fixed bg-gray-100 m-2 border-2 border-gray-300 shadow-sm"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							className="text-left tracking-widest bg-gray-300"
						>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()} className="p-3 font-normal">
									{column.render('Header')}
								</th>
							))}
							<th
								key="header_action"
								role="columnheader"
								colSpan="1"
								className="p-3 font-normal"
							>
								Action
							</th>
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="p-3 font-thin">
											{cell.render('Cell')}
										</td>
									);
								})}
								<td
									key={`cell_${row.id}_action`}
									role="cell"
									className="space-x-2"
								>
									<button
										onClick={() => changeForm(row.values.id)}
										className="btn-change"
									>
										Change
									</button>
									<button
										onClick={() => deleteForm(row.values.id)}
										className="btn-delete"
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="pagination m-2 flex space-x-4 items-center w-full">
				<span>
					<button
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
						className="btn-paginate disabled:opacity-50"
					>
						{'First'}
					</button>{' '}
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className="btn-paginate disabled:opacity-50"
					>
						{'Back'}
					</button>{' '}
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className="btn-paginate disabled:opacity-50"
					>
						{'Next'}
					</button>{' '}
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
						className="btn-paginate disabled:opacity-50"
					>
						{'Last'}
					</button>{' '}
				</span>
				<span className="tracking-wider">
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
					className="btn-paginate"
				>
					{[5, 6, 7, 8].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</>
	);
}

export default Table;
